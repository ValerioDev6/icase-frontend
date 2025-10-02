import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PersonalService } from '../../../../core/services/personal.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TipoTelefonoService } from '../../../../core/services/tipo-telefono.service';
import { ITelefonoCombo } from '../../../../core/interfaces/tipo-telefono.inteface';
import { finalize, forkJoin } from 'rxjs';
import { AuthService } from '../../../../core/services/common/auth.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
	selector: 'app-editar-personal',
	standalone: true,
	imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, NzSpinModule],
	templateUrl: './editar-personal.component.html',
	styleUrl: './editar-personal.component.scss',
	providers: [NzMessageService],
})
export default class EditarPersonalComponent implements OnInit {
	private readonly personaService = inject(PersonalService);
	private readonly tipotelefonoService = inject(TipoTelefonoService);
	private readonly logoutService = inject(AuthService);
	isLoading = false;
	private readonly route = inject(ActivatedRoute);
	private readonly message = inject(NzMessageService);
	private fb = inject(FormBuilder);
	tipoTelefonos: ITelefonoCombo[] = [];

	profileForm: FormGroup;

	constructor() {
		this.profileForm = this.fb.group({
			nombres: ['', [Validators.required, Validators.maxLength(50)]],
			id_tipo_telefono: ['', [Validators.required]],
			telefono: ['', [Validators.required]],
			apellido_paterno: ['', [Validators.required, Validators.maxLength(50)]],
			apellido_materno: ['', [Validators.required, Validators.maxLength(50)]],
			direccion_persona: ['', [Validators.required, Validators.maxLength(255)]],
		});
	}

	get nombresControl() {
		return this.profileForm.get('nombres');
	}

	get apellidoPaternoControl() {
		return this.profileForm.get('apellido_paterno');
	}

	get apellidoMaternoControl() {
		return this.profileForm.get('apellido_materno');
	}

	get direccionPersonaControl() {
		return this.profileForm.get('direccion_persona');
	}

	// Getters para validaciones
	get id_tipo_telefonoControl() {
		return this.profileForm.get('id_tipo_telefono');
	}

	get telefonoControl() {
		return this.profileForm.get('telefono');
	}
	// In your component's TypeScript file
	onSubmit() {
		// Check if the form is untouched
		if (this.profileForm.untouched) {
			this.message.warning('No ha realizado ningún cambio');
			return;
		}
		this.isLoading = true;
		// If the form is invalid, mark all controls as touched
		if (this.profileForm.invalid) {
			Object.keys(this.profileForm.controls).forEach((key) => {
				const control = this.profileForm.get(key);
				if (control!.invalid) {
					control!.markAsTouched();
				}
			});
			return;
		}

		const personaId = this.route.snapshot.paramMap.get('id');
		if (!personaId) {
			this.message.error('No se encontró el ID de la persona');
			return;
		}
		this.personaService
			.updatePersonas(personaId, this.profileForm.value)
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe({
				next: () => {
					this.message.success('Datos actualizados correctamente');
				},
				error: (error) => {
					console.error('Error al actualizar datos', error);
					this.message.error('No se pudieron actualizar los datos');
				},
			});
	}

	goHome() {
		this.logoutService.logout();
	}

	ngOnInit() {
		const personaId = this.route.snapshot.paramMap.get('id');
		if (personaId) {
			this.cargarDatosPersona(personaId);
			this.loadData();
		}
	}

	cargarDatosPersona(id: string) {
		this.personaService.getPersonalById(id).subscribe({
			next: (persona) => {
				this.profileForm.patchValue({
					nombres: persona.tb_personas.nombres || '',
					apellido_paterno: persona.tb_personas.apellido_paterno || '',
					apellido_materno: persona.tb_personas.apellido_materno || '',
					id_tipo_telefono: persona.tb_personas.tb_tipo_telefono.id_tipo_telefono || '',
					email: persona.email || '',
					telefono: persona.tb_personas.telefono || '',
					direccion_persona: persona.tb_personas.direccion_persona || '',
				});
			},
			error: (error) => {
				console.error('Error al cargar los datos de la persona', error);
			},
		});
	}

	loadData() {
		forkJoin({
			tipoTelefonos: this.tipotelefonoService.getTiposTelefonosData(),
		}).subscribe({
			next: (results) => {
				this.tipoTelefonos = results.tipoTelefonos;
			},
			error: () => {
				this.message.error('Error al cardatos del personal');
			},
		});
	}
}
