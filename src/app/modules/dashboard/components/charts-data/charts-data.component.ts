import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { SaleService } from '../../../../core/services/sale.service';
import { Subscription } from 'rxjs';
import { IVentasResponseGrafico } from '../../../../core/interfaces/sales.interface';
Chart.register(...registerables);
@Component({
	selector: 'app-charts-data',
	standalone: true,
	imports: [],
	templateUrl: './charts-data.component.html',
	styleUrl: './charts-data.component.scss',
})
export class ChartsDataComponent implements OnInit, OnDestroy {
	@ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
	private chart?: Chart;
	private dataSuscription?: Subscription;

	constructor(private salesService: SaleService) {}

	ngOnInit(): void {
		this.loadSalesData();
	}

	ngOnDestroy(): void {
		this.dataSuscription?.unsubscribe();
		this.chart?.destroy();
	}

	private loadSalesData(): void {
		this.dataSuscription = this.salesService.getVentasMes().subscribe({
			next: (data: IVentasResponseGrafico[]) => {
				const labels = this.getMonthLabels(data);
				const totals = this.getSalesByMonth(data);
				this.createLineChart(labels, totals);
			},
			error: (error) => {
				console.error('Error al cargar los datos de ventas', error);
			},
		});
	}

	private getMonthLabels(data: IVentasResponseGrafico[]): string[] {
		const monthNames = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		];

		return data.map((item) => monthNames[item.mes - 1] || `Mes ${item.mes}`);
	}

	private getSalesByMonth(data: IVentasResponseGrafico[]): number[] {
		return data.map((item) => item.total_ventas);
	}

	private createLineChart(labels: string[], totals: number[]): void {
		const ctx = this.salesChartRef.nativeElement.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'bar'> = {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Ventas Totales',
						data: totals,
						borderColor: 'rgba(54, 162, 235, 1)',
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Ventas Mensuales',
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
							text: 'Monto de Ventas',
						},
					},
					x: {
						title: {
							display: true,
							text: 'Meses',
						},
					},
				},
			},
		};

		this.chart = new Chart(ctx, config);
	}
}
