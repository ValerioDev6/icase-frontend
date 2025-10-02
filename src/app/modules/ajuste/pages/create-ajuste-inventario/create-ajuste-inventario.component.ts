import { Component, inject, OnInit } from '@angular/core';
import { AjusteService } from '../../../../core/services/ajuste.service';
import { IProductosComboResponse } from '../../../../core/interfaces/producto.interface';
import { forkJoin } from 'rxjs';
import { ProductoService } from '../../../../core/services/productos.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
	selector: 'app-create-ajuste-inventario',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NzSelectModule,
		NzIconModule,
		NzDatePickerModule,
		FormsModule,
		NzBreadCrumbModule,
		NzSpinModule,
		NzInputModule,
		NzInputNumberModule,
		NzButtonModule,
		NzSwitchModule,
		CommonModule,
		NzFormModule,
	],
	templateUrl: './create-ajuste-inventario.component.html',
	styleUrl: './create-ajuste-inventario.component.scss',
})
export default class CreateAjusteInventarioComponent implements OnInit {
	private readonly _ajusteService = inject(AjusteService);
	private readonly _productoService = inject(ProductoService);
	isLoading = true;
	productos: IProductosComboResponse[] = [];

	ajusteForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private message: NzMessageService
	) {
		this.ajusteForm = this.fb.group({
			razon_ajuste: ['', [Validators.required]],
			cantidad_ajuste: [0, [Validators.required]],
			stock_anterior: [{ value: 0, disabled: true }, [Validators.required]],
			stock_nuevo: [{ value: 0, disabled: true }, [Validators.required]],
			id_producto: ['', [Validators.required]],
			tipo_ajuste: ['INCREMENTO', [Validators.required]],
			nota: ['', [Validators.required]],
			fecha_ajuste: ['', [Validators.required]],
			estado: [true, [Validators.required]],
		});

		// Subscribe to product changes
		this.ajusteForm.get('id_producto')?.valueChanges.subscribe((productoId) => {
			if (productoId) {
				const producto = this.productos.find((p) => p.id_producto === productoId);
				if (producto) {
					this.ajusteForm.patchValue({
						stock_anterior: producto.stock,
					});
					this.calcularStockNuevo();
				}
			}
		});
		// Subscribe to cantidad_ajuste changes
		this.ajusteForm.get('cantidad_ajuste')?.valueChanges.subscribe(() => {
			this.calcularStockNuevo();
		});

		// Subscribe to tipo_ajuste changes
		this.ajusteForm.get('tipo_ajuste')?.valueChanges.subscribe(() => {
			this.calcularStockNuevo();
		});
	}

	private calcularStockNuevo(): void {
		const stockAnterior = this.getStockAnteriorAjusteForm()?.value || 0;
		const cantidadAjuste = this.getCantidadAjusteForm()?.value || 0;
		const tipoAjuste = this.ajusteForm.get('tipo_ajuste')?.value;

		let stockNuevo = stockAnterior;

		if (tipoAjuste === 'INCREMENTO') {
			stockNuevo = stockAnterior + cantidadAjuste;
		} else if (tipoAjuste === 'DISMINUCION') {
			stockNuevo = stockAnterior - cantidadAjuste;
			// Validate that stock doesn't go negative
			if (stockNuevo < 0) {
				this.message.warning('La cantidad a disminuir no puede ser mayor al stock actual');
				this.ajusteForm.patchValue({
					cantidad_ajuste: stockAnterior,
				});
				stockNuevo = 0;
			}
		}

		this.ajusteForm.patchValue({
			stock_nuevo: stockNuevo,
		});
	}

	getRazonAjusteForm() {
		return this.ajusteForm.get('razon_ajuste');
	}

	getCantidadAjusteForm() {
		return this.ajusteForm.get('cantidad_ajuste');
	}
	getStockAnteriorAjusteForm() {
		return this.ajusteForm.get('stock_anterior');
	}

	getStockNuevoAjusteForm() {
		return this.ajusteForm.get('stock_nuevo');
	}

	getProductoAjusteForm() {
		return this.ajusteForm.get('id_producto');
	}

	getNotaAjusteForm() {
		return this.ajusteForm.get('nota');
	}

	getFechaAjusteForm() {
		return this.ajusteForm.get('fecha_ajuste');
	}

	getEstadoAjusteForm() {
		return this.ajusteForm.get('estado');
	}

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		this.isLoading = true;
		forkJoin({
			productos: this._productoService.getProductosCombo(),
		}).subscribe({
			next: (resultado) => {
				this.productos = resultado.productos;
				this.isLoading = false;
			},
			error: () => (this.isLoading = false),
		});
	}

	onSubmit() {
		if (this.ajusteForm.valid) {
			const ajusteData = {
				...this.ajusteForm.value,
				stock_anterior: this.getStockAnteriorAjusteForm()?.value,
				stock_nuevo: this.getStockNuevoAjusteForm()?.value,
			};

			this._ajusteService.createAjuste(ajusteData).subscribe({
				next: () => {
					this.message.success('Ajuste de inventario creado exitosamente');
					this.ajusteForm.reset({
						tipo_ajuste: 'INCREMENTO',
						estado: true,
						cantidad_ajuste: 0,
					});
					this.loadData(); // Refresh product list
				},
				error: (error) => {
					this.message.error('Error creando ajuste: ' + error.message);
				},
			});
		} else {
			this.validateForm();
		}
	}

	private validateForm(): void {
		Object.values(this.ajusteForm.controls).forEach((control) => {
			if (control.invalid) {
				control.markAsDirty();
				control.updateValueAndValidity({ onlySelf: true });
			}
		});
	}

	getEstadoLabel(): string {
		return this.getEstadoAjusteForm()?.value ? 'Activo' : 'Inactivo';
	}
}
