import { Component, inject, OnInit } from '@angular/core';
import { GoogleSheetsService } from '../../../../core/services/goooge-sheets.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-crear-encuesta',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	templateUrl: './crear-encuesta.component.html',
	styleUrl: './crear-encuesta.component.scss',
})
export default class CrearEncuestaComponent implements OnInit {
	private readonly encuestaService = inject(GoogleSheetsService);
	private fb = inject(FormBuilder);
	private readonly route = inject(ActivatedRoute);
	isSubmitting = false;
	idPersonal!: string;

	ratingFields = [
		{ name: 'calidad_sistema', label: 'Calidad del Sistema' },
		{ name: 'facilidad_uso', label: 'Facilidad de Uso' },
		{ name: 'atencion_cliente', label: 'Atención al Cliente' },
		{ name: 'proceso_venta', label: 'Proceso de Venta' },
	];

	encuestaForm: FormGroup = this.fb.group({
		calificacion_general: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
		recomendacion: [null, Validators.required], // El valor será 1 o 0
		calidad_sistema: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
		facilidad_uso: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
		atencion_cliente: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
		proceso_venta: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
		funcionamiento_sistema: ['', Validators.required],
		comentarios: ['', Validators.required],
	});

	getRatingLabel(value: number): string {
		const labels = {
			1: 'Muy malo',
			2: 'Malo',
			3: 'Regular',
			4: 'Bueno',
			5: 'Excelente',
		};
		return labels[value as keyof typeof labels];
	}
	ngOnInit(): void {
		// Obtener el ID de la ruta
		this.idPersonal = this.route.snapshot.paramMap.get('id') as string;

		if (!this.idPersonal) {
			console.error('ID de personal no encontrado en la URL');
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se pudo encontrar el ID del personal.',
				confirmButtonColor: '#3B82F6',
			});
			// Redirigir a una ruta segura si no hay ID
		}
	}

	onSubmit(): void {
		if (this.encuestaForm.valid) {
			this.isSubmitting = true;

			// Convertir los valores string a number
			const formData = {
				...this.encuestaForm.value,
				calificacion_general: Number(this.encuestaForm.value.calificacion_general),
				calidad_sistema: Number(this.encuestaForm.value.calidad_sistema),
				facilidad_uso: Number(this.encuestaForm.value.facilidad_uso),
				atencion_cliente: Number(this.encuestaForm.value.atencion_cliente),
				proceso_venta: Number(this.encuestaForm.value.proceso_venta),
				// recomendacion ya viene como number (1 o 0)
			};

			this.encuestaService
				.postDataEncuesta(this.idPersonal, formData)
				.pipe(finalize(() => (this.isSubmitting = false)))
				.subscribe({
					next: () => {
						Swal.fire({
							icon: 'success',
							title: '¡Gracias por tu feedback!',
							text: 'Tu encuesta ha sido enviada exitosamente.',
							confirmButtonColor: '#3B82F6',
						});
						this.encuestaForm.reset();
					},
					error: (error) => {
						console.error('Error al enviar la encuesta:', error);
						Swal.fire({
							icon: 'error',
							title: 'Error',
							text: 'Hubo un problema al enviar la encuesta. Por favor, intenta nuevamente.',
							confirmButtonColor: '#3B82F6',
						});
					},
				});
		} else {
			Object.keys(this.encuestaForm.controls).forEach((key) => {
				const control = this.encuestaForm.get(key);
				if (control?.invalid) {
					control.markAsTouched();
				}
			});
		}
	}
}
