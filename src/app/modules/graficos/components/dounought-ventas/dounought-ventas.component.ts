/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SaleService } from '../../../../core/services/sale.service';
import { Subscription } from 'rxjs';
import { VentasPorMes } from '../../../../core/interfaces/sales.interface';

Chart.register(...registerables);

@Component({
	selector: 'app-dounought-ventas',
	standalone: true,
	imports: [],
	templateUrl: './dounought-ventas.component.html',
	styleUrl: './dounought-ventas.component.scss',
})
export class DounoughtVentasComponent implements OnInit, OnDestroy {
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
		this.dataSuscription = this.comprasService.getVentasAnuales().subscribe({
			next: (data) => {
				console.log('Datos recibidos:', data);

				if (!data || !data.ventasPorMes) {
					console.error('No se recibieron datos de compras');
					return;
				}

				const monthsData = [
					{ mes: 1, total: '0' },
					{ mes: 2, total: '0' },
					{ mes: 3, total: '0' },
					{ mes: 4, total: '0' },
					{ mes: 5, total: '0' },
					{ mes: 6, total: '0' },
					{ mes: 7, total: '0' },
					{ mes: 8, total: '0' },
					{ mes: 9, total: '0' },
					{ mes: 10, total: '0' },
					{ mes: 11, total: '0' },
					{ mes: 12, total: '0' },
				];

				// Sobrescribir con los datos reales
				data.ventasPorMes.forEach((item) => {
					const index = monthsData.findIndex((m) => m.mes === item.mes);
					if (index !== -1) {
						monthsData[index] = item;
					}
				});

				const labels = this.getMonthLabels(monthsData);
				const totals = this.getComprasByMonth(monthsData);
				this.createDoughnutChart(labels, totals, data.anio, data.totalAnual);
			},
			error: (error) => {
				console.error('Error al cargar los datos de compras', error);
			},
		});
	}

	private getMonthLabels(ventasPorMes: VentasPorMes[]): string[] {
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
		return monthNames;
	}

	private getComprasByMonth(ventasPorMes: VentasPorMes[]): number[] {
		return ventasPorMes.map((item) => parseFloat(item.total));
	}

	private createDoughnutChart(labels: string[], totals: number[], year: number, totalAnual: string): void {
		console.log('Etiquetas:', labels); // Log de etiquetas
		console.log('Totales:', totals); // Log de totales

		this.chart = new Chart(this.comprasDoughnutChartRef.nativeElement, {
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
							'rgba(255, 77, 77, 0.6)',
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
							'rgba(255, 77, 77, 1)',
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
						text: `Distribución de Compras ${year} - Total: S/${totalAnual}`,
					},
					legend: {
						display: true,
						position: 'top',
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								const label = context.label || '';
								const value = context.parsed || 0;
								return `${label}: $${value.toFixed(2)}`;
							},
						},
					},
				},
				cutout: '50%',
			},
		});
	}
}
