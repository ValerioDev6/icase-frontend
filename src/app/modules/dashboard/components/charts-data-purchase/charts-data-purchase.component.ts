import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { SaleService } from '../../../../core/services/sale.service';
import { IComprasDiasResponse } from '../../../../core/interfaces/sales.interface';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);
@Component({
	selector: 'app-charts-data-purchase',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './charts-data-purchase.component.html',
	styleUrl: './charts-data-purchase.component.scss',
})
export class ChartsDataPurchaseComponent implements OnInit, OnDestroy {
	@ViewChild('purchasesChart') purchasesChartRef!: ElementRef<HTMLCanvasElement>;
	private chart?: Chart;
	private dataSuscription?: Subscription;

	constructor(private comprasService: SaleService) {}

	ngOnInit(): void {
		this.loadPurchasesData();
	}

	ngOnDestroy(): void {
		this.dataSuscription?.unsubscribe();
		this.chart?.destroy();
	}

	private loadPurchasesData(): void {
		this.dataSuscription = this.comprasService.getComprasDias().subscribe({
			next: (data: IComprasDiasResponse[]) => {
				const sortedData = [...data].sort((a, b) => a.dia - b.dia);

				const labels = sortedData.map((item) => `Día ${item.dia}`);
				const totals = sortedData.map((item) => parseFloat(item.total.toString()));

				this.createBarChart(labels, totals);
			},
			error: (error) => {
				console.error('Error al cargar los datos de compras', error);
			},
		});
	}

	private createBarChart(labels: string[], totals: number[]): void {
		const ctx = this.purchasesChartRef.nativeElement.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'bar'> = {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Compras Totales',
						data: totals,
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Compras de los Últimos 10 Días',
					},
					legend: {
						display: true,
						position: 'top',
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Monto de Compras',
						},
					},
					x: {
						title: {
							display: true,
							text: 'Días',
						},
					},
				},
			},
		};

		this.chart = new Chart(ctx, config);
	}
}
