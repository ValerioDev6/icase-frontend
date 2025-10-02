import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RolesService } from '../../../../core/services/roles.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PermisosService } from '../../../../core/services/permisos.service';
import { IModulesComborResponse, IRolCombo } from '../../../../core/interfaces/roles.interface';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { IPermisosResponse } from '../../../../core/interfaces/permisos.interface';
interface ModalData {
	id_permiso: string;
}
@Component({
	selector: 'app-actualizar-permisos',
	standalone: true,
	imports: [CommonModule, NzIconModule, ReactiveFormsModule, FormsModule],
	templateUrl: './actualizar-permisos.component.html',
	styleUrl: './actualizar-permisos.component.scss',
})
export class ActualizarPermisosComponent implements OnInit {
	private readonly permisosService = inject(PermisosService);
	private readonly rolesService = inject(RolesService);
	private readonly modalRef = inject(NzModalRef);
	private readonly formBuilder = inject(FormBuilder);
	private readonly data = inject<ModalData>(NZ_MODAL_DATA);
	private readonly message = inject(NzMessageService);

	roles: IRolCombo[] = [];
	modulos: IModulesComborResponse[] = [];
	isLoading = false;
	permisos!: IPermisosResponse;
	formGroup = this.formBuilder.nonNullable.group({
		id_rol: ['', [Validators.required]],
		id_modulo: ['', [Validators.required]],
		puede_crear: [0],
		puede_leer: [0],
		puede_actualizar: [0],
		puede_eliminar: [0],
		estado: [1],
	});

	ngOnInit(): void {
		this.loadDataPermiso();
		this.loadData();
	}

	loadDataPermiso() {
		if (this.data.id_permiso) {
			this.permisosService.getPermisoById(this.data.id_permiso).subscribe({
				next: (permiso: IPermisosResponse) => {
					this.permisos = permiso;
					this.formGroup.patchValue({
						id_rol: permiso.id_rol,
						id_modulo: permiso.id_modulo,
						puede_crear: permiso.puede_crear,
						puede_leer: permiso.puede_leer,
						puede_actualizar: permiso.puede_actualizar,
						puede_eliminar: permiso.puede_eliminar,
						estado: permiso.estado,
					});
				},
				error: (error) => {
					console.log('Error al cargar los datos', error);
				},
			});
		}
	}

	loadData() {
		this.isLoading = true;
		forkJoin({
			roles: this.rolesService.getRolesCombo(),
			modulos: this.permisosService.getAllModulos(),
		}).subscribe({
			next: (resultado) => {
				this.roles = resultado.roles;
				this.modulos = resultado.modulos;
				this.isLoading = false;
			},
			error: () => {
				this.message.error('Hubo un error al cargar los datos. Por favor, intente nuevamente.');
			},
		});
	}

	onUpdatePermisos() {
		if (this.formGroup.valid && this.permisos) {
			if (!this.formGroup.dirty) {
				this.message.warning('No se han realizado cambios');
				return;
			}
			const updatedPermiso = {
				...this.permisos,
				...this.formGroup.value,
			};

			this.permisosService.updatedPermiso(updatedPermiso).subscribe({
				next: () => {
					this.message.success('Permiso  actualizada correctamente');
					this.modalRef.close(true);
				},
				error: (error) => {
					console.error('Error al actualizar la categoría', error);
					this.handleUpdatePermisoErrro(error);
				},
			});
		}
	}

	private handleUpdatePermisoErrro(error: HttpErrorResponse): void {
		console.error('Error completo:', error);

		if (error.status === 400) {
			const errorMessage = error.error?.message || 'Error al actualizar el permiso';
			this.message.error(errorMessage);
		} else {
			this.message.error('Error al actualizar el permiso. Por favor, inténtelo de nuevo.');
		}
	}

	cancelar(): void {
		this.modalRef.close();
	}

	onPermisoChange(permiso: string, event: any) {
		this.formGroup.get(permiso)?.setValue(event.target.checked ? 1 : 0);
	}
}
