import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PeruvianCurrencyPipe } from '../../../../shared/pipes/pipe-currency.pipe';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RouterModule } from '@angular/router';
import { InventarioService } from '../../../../core/services/inventario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Inventario, IResponseInventario } from '../../../../core/interfaces/inventario.interface';
import Swal from 'sweetalert2';
const NZ_MODULES = [
	NzInputModule,
	NzIconModule,
	NzButtonModule,
	NzTableModule,
	NzPaginationModule,
	NzFormModule,
	NzLayoutModule,
	NzToolTipModule,
	NzSelectModule,
	NzDropDownModule,
	NzDividerModule,
	NzCardModule,
	NzTagModule,
	NzBreadCrumbModule,
	NzToolTipModule,
	NzSpaceModule,
	NzModalModule,
	NzPopconfirmModule,
];

@Component({
	selector: 'app-inventario-lista',
	standalone: true,
	imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, NZ_MODULES, PeruvianCurrencyPipe],
	templateUrl: './inventario-lista.component.html',
	styleUrl: './inventario-lista.component.scss',
})
export default class InventarioListaComponent implements OnInit {
	constructor(
		private readonly inventarioService: InventarioService,
		private readonly message: NzMessageService
	) {}

	inventarios: Inventario[] = [];
	loading = false;
	search: string = '';
	page: number = 1;
	limit: number = 10;
	total: number = 0;

	ngOnInit(): void {
		this.loadDataInventario();
	}

	loadDataInventario() {
		this.loading = true;
		this.inventarioService.findAllInventario(this.page, this.limit, this.search).subscribe({
			next: (response: IResponseInventario) => {
				this.inventarios = response.inventario;
				this.total = response.info.total;
				this.loading = false;
			},
		});
	}

	searchTo() {
		this.page = 1;
		this.loadDataInventario();
	}

	onPageChange(page: number) {
		this.page = page;
		this.loadDataInventario();
	}

	refreshPage() {
		this.loadDataInventario();
	}

	deleteProducto(inventario: Inventario) {
		Swal.fire({
			title: '¿Está seguro?',
			text: `Este proceso no es reversible, está a punto de eliminar su inventario realizado el  , ${inventario.fecha_creacion}`,
			showCancelButton: true,
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'No, cancelar',
			customClass: {
				popup: 'swal2-popup-custom',
				title: 'swal2-title-custom',
				htmlContainer: 'swal2-html-container-custom',
				confirmButton: 'swal2-confirm-button-custom',
				cancelButton: 'swal2-cancel-button-custom',
			},
			buttonsStyling: false,
			iconHtml:
				'<svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16 text-red-500"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
		}).then((result) => {
			if (result.isConfirmed) {
				this.loading = true;
				this.inventarioService.deleteInventario(inventario.id_inventario).subscribe({
					next: () => {
						this.loadDataInventario();
						this.message.success(' Inventario eliminado con éxito');
					},
					error: () => {
						this.loading = false;
						this.message.error('Error al eliminar el inventario');
					},
				});
			}
		});
	}
}
