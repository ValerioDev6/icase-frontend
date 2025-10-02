import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
import { InventarioService } from '../../../../core/services/inventario.service';
import { SucursalService } from '../../../../core/services/sucursales.service';
import { ProductoService } from '../../../../core/services/productos.service';
import { IProductosComboResponse } from '../../../../core/interfaces/producto.interface';
import { ISucursalComboBox } from '../../../../core/interfaces/sucursales.interface';
@Component({
	selector: 'app-crear-registro-inventario',
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
	templateUrl: './crear-registro-inventario.component.html',
	styleUrl: './crear-registro-inventario.component.scss',
})
export default class CrearRegistroInventarioComponent implements OnInit {
	private readonly _inventarioService = inject(InventarioService);
	private readonly _sucursalService = inject(SucursalService);
	private readonly _productoService = inject(ProductoService);
	isLoading = true;

	productos: IProductosComboResponse[] = [];
	sucursales: ISucursalComboBox[] = [];

	inventarioForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private message: NzMessageService
	) {
		this.inventarioForm = this.fb.group({
			id_producto: ['', [Validators.required]],
			id_sucursal: ['', [Validators.required]],
			cantidad: [0, [Validators.required, Validators.min(1)]],
			comentarios: ['', [Validators.required]],
			fecha_creacion: ['', [Validators.required]],
			tipo_movimiento: ['ENTRADA', [Validators.required]],
			stock_anterior: [{ value: 0, disabled: true }, [Validators.required]],
			stock_nuevo: [{ value: 0, disabled: true }, [Validators.required]],
		});

		// Suscripción a cambios en producto seleccionado
		this.inventarioForm.get('id_producto')?.valueChanges.subscribe((productoId) => {
			if (productoId) {
				const producto = this.productos.find((p) => p.id_producto === productoId);
				if (producto) {
					this.inventarioForm.patchValue({
						stock_anterior: producto.stock,
					});
					this.calcularStockNuevo();
				}
			}
		});

		// Suscripción a cambios en cantidad
		this.inventarioForm.get('cantidad')?.valueChanges.subscribe(() => {
			this.calcularStockNuevo();
		});

		// Suscripción a cambios en tipo de movimiento
		this.inventarioForm.get('tipo_movimiento')?.valueChanges.subscribe(() => {
			this.calcularStockNuevo();
		});
	}

	private calcularStockNuevo(): void {
		const stockAnterior = this.getStockAnteriorInventarioForm()?.value || 0;
		const cantidad = this.geCantidadInventarioForm()?.value || 0;
		const tipoMovimiento = this.getTipoMovimientoInventarioForm()?.value;

		let stockNuevo = stockAnterior;

		if (tipoMovimiento === 'ENTRADA') {
			stockNuevo = stockAnterior + cantidad;
		} else if (tipoMovimiento === 'SALIDA') {
			stockNuevo = stockAnterior - cantidad;
			// Validar que el stock no sea negativo
			if (stockNuevo < 0) {
				this.message.warning('La cantidad a retirar no puede ser mayor al stock disponible');
				this.inventarioForm.patchValue({
					cantidad: stockAnterior,
				});
				stockNuevo = 0;
			}
		}

		this.inventarioForm.patchValue({
			stock_nuevo: stockNuevo,
		});
	}
	getProductInventarioForm() {
		return this.inventarioForm.get('id_producto');
	}

	getSucursalInventarioForm() {
		return this.inventarioForm.get('id_sucursal');
	}
	geCantidadInventarioForm() {
		return this.inventarioForm.get('cantidad');
	}
	getComentarioInventarioForm() {
		return this.inventarioForm.get('comentarios');
	}
	getFechaInventarioForm() {
		return this.inventarioForm.get('fecha_creacion');
	}
	getTipoMovimientoInventarioForm() {
		return this.inventarioForm.get('tipo_movimiento');
	}
	getStockAnteriorInventarioForm() {
		return this.inventarioForm.get('stock_anterior');
	}
	getStockNuevoInventarioForm() {
		return this.inventarioForm.get('stock_nuevo');
	}

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		this.isLoading = true;
		forkJoin({
			productos: this._productoService.getProductosCombo(),
			sucursales: this._sucursalService.getComboBoxSucursalesAll(),
		}).subscribe({
			next: (resultado) => {
				this.productos = resultado.productos;
				this.sucursales = resultado.sucursales;
				this.isLoading = false;
			},
			error: () => {
				this.isLoading = false;
			},
		});
	}

	onSubmit() {
		if (this.inventarioForm.valid) {
			const inventarioData = {
				...this.inventarioForm.value,
				stock_anterior: this.getStockAnteriorInventarioForm()?.value,
				stock_nuevo: this.getStockNuevoInventarioForm()?.value,
			};

			this._inventarioService.createInventario(inventarioData).subscribe({
				next: () => {
					this.message.success('Inventario registrado correctamente');
					this.inventarioForm.reset({
						tipo_movimiento: 'ENTRADA',
						cantidad: 0,
					});
					this.loadData();
				},
				error: (err) => {
					this.message.error('Error registrando inventario: ' + err.message);
				},
			});
		} else {
			this.validateForm();
		}
	}

	private validateForm(): void {
		Object.values(this.inventarioForm.controls).forEach((control) => {
			if (control.invalid) {
				control.markAsDirty();
				control.updateValueAndValidity({ onlySelf: true });
			}
		});
	}
}
