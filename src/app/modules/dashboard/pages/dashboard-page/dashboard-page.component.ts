import { Component, OnInit } from '@angular/core';
import { ITotalesResponse } from '../../../../core/interfaces/totales.interface';
import { SaleService } from '../../../../core/services/sale.service';
import { CardsComponent } from '../../components/cards/cards.component';
import { ChartsDataComponent } from '../../components/charts-data/charts-data.component';
import { TableInfoComponent } from '../../components/table-info/table-info.component';
import { ChartsDataPurchaseComponent } from '../../components/charts-data-purchase/charts-data-purchase.component';

@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	imports: [CardsComponent, ChartsDataComponent, TableInfoComponent, ChartsDataPurchaseComponent],
	templateUrl: './dashboard-page.component.html',
	styleUrl: './dashboard-page.component.scss',
})
export default class DashboardPageComponent implements OnInit {
	totales!: ITotalesResponse;
	isLoading = true;

	constructor(private readonly saleSevice: SaleService) {}

	ngOnInit(): void {
		this.loadtotals();
	}

	private loadtotals(): void {
		this.isLoading = true;
		this.saleSevice.getTotal().subscribe({
			next: (data) => {
				this.totales = data;
				this.isLoading = false;
			},
			error: () => {
				this.isLoading = false;
			},
		});
	}
}


