/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IModulesComborResponse, IRolCombo } from '../../../../core/interfaces/roles.interface';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PermisosService } from '../../../../core/services/permisos.service';
import { RolesService } from '../../../../core/services/roles.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
const NZ_MODULES = [NzSpinModule, NzIconModule, NzSelectModule, NzSwitchModule, NzButtonModule, NzFormModule];
@Component({
	selector: 'app-agregar-permisos-modal',
	standalone: true,
	imports: [NZ_MODULES, ReactiveFormsModule, CommonModule],
	templateUrl: './agregar-permisos-modal.component.html',
	styleUrl: './agregar-permisos-modal.component.scss',
})
export class AgregarPermisosModalComponent implements OnInit {
	permisosForm: FormGroup;

	roles: IRolCombo[] = [];
	modulos: IModulesComborResponse[] = [];
	isLoading = true;

	constructor(
		private fb: FormBuilder,
		private modalRef: NzModalRef,
		private readonly permisosService: PermisosService,
		private readonly roleService: RolesService,
		private message: NzMessageService
	) {
		this.permisosForm = this.fb.group({
			id_rol: ['', [Validators.required]],
			id_modulo: ['', [Validators.required]],
			puede_crear: [0],
			puede_leer: [0],
			puede_actualizar: [0],
			puede_eliminar: [0],
			estado: [1],
		});
	}
	onPermisoChange(permiso: string, event: any) {
		this.permisosForm.get(permiso)?.setValue(event.target.checked ? 1 : 0);
	}

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		this.isLoading = true;
		forkJoin({
			roles: this.roleService.getRolesCombo(),
			modulos: this.permisosService.getAllModulos(),
		}).subscribe({
			next: (resultado) => {
				this.modulos = resultado.modulos;
				this.roles = resultado.roles;
				this.isLoading = false;
			},
			error: () => {
				this.isLoading = false;
			},
		});
	}

	onSubmit() {
		if (this.permisosForm.valid) {
			const permisosData = this.permisosForm.value;
			this.permisosService.createPermisos(permisosData).subscribe({
				next: () => {
					this.message.success('Permisos creado correctamenete');
					this.modalRef.close(true);
				},
				error: () => {
					this.message.error('Ya existe un permiso para ese rol y modulo ');
				},
			});
		} else {
			this.validateForm();
		}
	}

	private validateForm(): void {
		Object.values(this.permisosForm.controls).forEach((control) => {
			if (control.invalid) {
				control.markAsDirty();
				control.updateValueAndValidity({ onlySelf: true });
			}
		});
	}
	cancelar() {
		this.modalRef.close();
	}
}
