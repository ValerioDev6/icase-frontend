import { Component, inject, OnInit } from '@angular/core';
import { IResponseVentasHoySemanaMes } from '../../../../core/interfaces/ventas.info';
import { SaleService } from '../../../../core/services/sale.service';
import { PeruvianCurrencyPipe } from '../../../../shared/pipes/pipe-currency.pipe';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-cards',
	standalone: true,
	imports: [PeruvianCurrencyPipe, CommonModule],
	templateUrl: './cards.component.html',
	styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
	private readonly _salesService = inject(SaleService);
	ventasData: IResponseVentasHoySemanaMes | null = null;

	ngOnInit(): void {
		this.loadData();
	}

	private loadData() {
		this._salesService.geHoySemanaMes().subscribe({
			next: (data) => {
				this.ventasData = data;
			},
			error: (error) => {
				console.log('Error al cargar datos de ventas', error);
			},
		});
	}
}
