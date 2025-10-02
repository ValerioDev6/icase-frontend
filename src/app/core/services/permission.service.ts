import { Injectable } from '@angular/core';
import { AuthService } from './common/auth.service';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	constructor(private authService: AuthService) {}

	hasModulePermission(module: string, action: 'crear' | 'leer' | 'actualizar' | 'eliminar') {
		return this.authService.user$.pipe(
			map((user) => {
				if (!user) return false;
				const modulePermission = user.permisos.find((p) => p.modulo === module);
				return modulePermission?.permisos[action] || false;
			})
		);
	}
}
