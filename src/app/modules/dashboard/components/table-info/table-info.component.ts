import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../../core/services/sale.service';
import { IArticulosTopResponse } from '../../../../core/interfaces/sales.interface';

@Component({
	selector: 'app-table-info',
	standalone: true,
	imports: [],
	templateUrl: './table-info.component.html',
	styleUrl: './table-info.component.scss',
})
export class TableInfoComponent implements OnInit {
	constructor(private readonly _saleService: SaleService) {}
	articulosTop: IArticulosTopResponse[] = [];

	ngOnInit() {
		this._saleService.getArticulosVendidos().subscribe({
			next: (productos) => {
				this.articulosTop = productos;
			},
			error: (error) => {
				console.error('Error al cargar productos', error);
			},
		});
	}

	loadData() {}
}
