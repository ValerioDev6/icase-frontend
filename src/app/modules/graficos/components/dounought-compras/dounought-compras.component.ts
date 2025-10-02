import { Component, inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { SaleService } from '../../../../core/services/sale.service';
import { Subscription } from 'rxjs';
import { ComprasPorMes, IComprasAnualesResponse } from '../../../../core/interfaces/sales.interface';

Chart.register(...registerables);

@Component({
	selector: 'app-dounought-compras',
	standalone: true,
	imports: [],
	templateUrl: './dounought-compras.component.html',
	styleUrl: './dounought-compras.component.scss',
})
export class DounoughtComprasComponent implements OnInit, OnDestroy {
	@ViewChild('comprasDoughnutChart') comprasDoughnutChartRef!: ElementRef<HTMLCanvasElement>;

	private readonly comprasService = inject(SaleService);
	private chart?: Chart;
	private dataSuscription?: Subscription;

	ngOnInit() {
		this.loadComprasAnuales();
	}

	ngOnDestroy(): void {
		this.dataSuscription?.unsubscribe();
		this.chart?.destroy();
	}

	private loadComprasAnuales(): void {
		this.dataSuscription = this.comprasService.getComprasAnuales().subscribe({
			next: (data: IComprasAnualesResponse) => {
				// Add null/undefined checks
				if (!data || !data.comprasPorMes) {
					console.error('No se recibieron datos de compras');
					return;
				}

				const labels = this.getMonthLabels(data.comprasPorMes);
				const totals = this.getComprasByMonth(data.comprasPorMes);
				this.createDoughnutChart(labels, totals, data.anio, data.totalAnual);
			},
			error: (error) => {
				console.error('Error al cargar los datos de compras', error);
			},
		});
	}

	private getMonthLabels(comprasPorMes: ComprasPorMes[]): string[] {
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
		return comprasPorMes.map((item) => monthNames[item.mes - 1] || `Mes ${item.mes}`);
	}

	private getComprasByMonth(comprasPorMes: ComprasPorMes[]): number[] {
		return comprasPorMes.map((item) => parseFloat(item.total));
	}

	private createDoughnutChart(labels: string[], totals: number[], year: number, totalAnual: string): void {
		const ctx = this.comprasDoughnutChartRef.nativeElement.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'doughnut'> = {
			type: 'doughnut',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Compras Mensuales S/',
						data: totals,
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(199, 199, 199, 0.6)',
							'rgba(83, 102, 255, 0.6)',
							'rgba(40, 159, 64, 0.6)',
							'rgba(210, 99, 132, 0.6)',
							'rgba(90, 162, 235, 0.6)',
							'rgba(255, 106, 86, 0.6)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(199, 199, 199, 1)',
							'rgba(83, 102, 255, 1)',
							'rgba(40, 159, 64, 1)',
							'rgba(210, 99, 132, 1)',
							'rgba(90, 162, 235, 1)',
							'rgba(255, 106, 86, 1)',
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: `Distribución de Compras ${year} - Total: S/ ${totalAnual}`,
					},
					legend: {
						display: true,
						position: 'right',
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								const value = context.parsed;
								const total = context.dataset.data.reduce((a, b) => a + b, 0);
								const percentage = ((value / total) * 100).toFixed(2);
								return `${context.label}: S/${value} (${percentage}%)`;
							},
						},
					},
				},
			},
		};

		this.chart = new Chart(ctx, config);
	}
}
