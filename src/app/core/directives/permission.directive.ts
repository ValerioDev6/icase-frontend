import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/common/auth.service';

interface Permission {
	module: string;
	action: 'crear' | 'leer' | 'actualizar' | 'eliminar';
}

@Directive({
	selector: '[appHasPermission]',
	standalone: true,
})
export class HasPermissionDirective implements OnInit, OnDestroy {
	@Input('appHasPermission') permission: Permission = {
		module: '',
		action: 'leer',
	};

	private destroy$ = new Subject<void>();

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
		private authService: AuthService
	) {}

	ngOnInit() {
		// Verificamos que el módulo no esté vacío
		if (!this.permission.module) {
			console.warn('appHasPermission: module name is required');
			return;
		}

		this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
			if (!user) {
				this.viewContainer.clear();
				return;
			}

			const modulePermission = user.permisos.find((p) => p.modulo === this.permission.module);
			if (modulePermission?.permisos[this.permission.action]) {
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else {
				this.viewContainer.clear();
			}
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
