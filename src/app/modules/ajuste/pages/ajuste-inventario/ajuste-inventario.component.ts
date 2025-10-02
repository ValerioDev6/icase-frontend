import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import Swal from 'sweetalert2';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { AjusteService } from '../../../../core/services/ajuste.service';
import { Ajuste, IAjustesResponseData } from '../../../../core/interfaces/ajuste.interface';
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
	NzPopconfirmModule,
];
@Component({
	selector: 'app-ajuste-inventario',
	standalone: true,
	imports: [CommonModule, NgxBarcode6Module, RouterModule, ReactiveFormsModule, FormsModule, NZ_MODULES, NzModalModule],
	templateUrl: './ajuste-inventario.component.html',
	styleUrl: './ajuste-inventario.component.scss',
})
export default class AjusteInventarioComponent implements OnInit {
	constructor(
		private readonly _ajusteService: AjusteService,
		private readonly message: NzMessageService
	) {}

	ajustes: Ajuste[] = [];
	loading = false;
	search: string = '';
	page: number = 1;
	limit: number = 10;
	total: number = 0;

	ngOnInit(): void {
		this.loadDataAjustes();
	}

	loadDataAjustes() {
		this.loading = true;
		this._ajusteService.findAllAjustes(this.page, this.limit, this.search).subscribe({
			next: (response: IAjustesResponseData) => {
				this.ajustes = response.ajustes;
				this.total = response.info.total;
				this.loading = false;
			},
		});
	}

	searchTo() {
		this.page = 1;
		this.loadDataAjustes();
	}

	onPageChange(page: number) {
		this.page = page;
		this.loadDataAjustes();
	}

	refreshPage() {
		this.loadDataAjustes();
	}
	deleteProducto(ajuste: Ajuste) {
		Swal.fire({
			title: '¿Está seguro?',
			text: `Este proceso no es reversible, está a punto de eliminar su ajust realizado el  , ${ajuste.fecha_ajuste}`,
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
				this._ajusteService.deleteAjusteById(ajuste.id_ajuste).subscribe({
					next: () => {
						this.loadDataAjustes();
						this.message.success('Ajuste Inventario eliminado con éxito');
					},
					error: () => {
						this.loading = false;
						this.message.error('Error al eliminar El ajuste inventario');
					},
				});
			}
		});
	}
}
