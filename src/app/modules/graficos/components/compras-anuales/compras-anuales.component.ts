import { Component, inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { SaleService } from '../../../../core/services/sale.service';
import { Subscription } from 'rxjs';
import { VentasPorMes } from '../../../../core/interfaces/sales.interface';

Chart.register(...registerables);

@Component({
	selector: 'app-compras-anuales',
	standalone: true,
	imports: [],
	templateUrl: './compras-anuales.component.html',
	styleUrl: './compras-anuales.component.scss',
})
export class ComprasAnualesComponent implements OnInit, OnDestroy {
	@ViewChild('comprasChart') comprasChartRef!: ElementRef<HTMLCanvasElement>;

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
				if (!data || !data.ventasPorMes) {
					console.error('No se recibieron datos de compras');
					return;
				}

				const labels = this.getMonthLabels(data.ventasPorMes);
				const totals = this.getComprasByMonth(data.ventasPorMes);
				this.createBarChart(labels, totals, data.anio, data.totalAnual);
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
		return ventasPorMes.map((item) => monthNames[item.mes - 1] || `Mes ${item.mes}`);
	}

	private getComprasByMonth(ventasPorMes: VentasPorMes[]): number[] {
		return ventasPorMes.map((item) => parseFloat(item.total));
	}

	private createBarChart(labels: string[], totals: number[], year: number, totalAnual: string): void {
		const ctx = this.comprasChartRef.nativeElement.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Compras Mensuales S/',
						data: totals,
						borderColor: 'rgba(255, 99, 132, 1)',
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: `Compras Anuales ${year} - Total:S/ ${totalAnual}`,
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
							text: 'Meses',
						},
					},
				},
			},
		};

		this.chart = new Chart(ctx, config);
	}
}
