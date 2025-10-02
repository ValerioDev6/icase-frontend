import { Component, inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { SaleService } from '../../../../core/services/sale.service';
import { Subscription } from 'rxjs';
import { ComprasPorMes, IComprasAnualesResponse } from '../../../../core/interfaces/sales.interface';

Chart.register(...registerables);

@Component({
	selector: 'app-ventas-anuales',
	standalone: true,
	imports: [],
	templateUrl: './ventas-anuales.component.html',
	styleUrl: './ventas-anuales.component.scss',
})
export class VentasAnualesComponent implements OnInit, OnDestroy {
	@ViewChild('ventasChart') ventasChartRef!: ElementRef<HTMLCanvasElement>;

	private readonly ventasService = inject(SaleService);
	private chart?: Chart;
	private dataSuscription?: Subscription;

	ngOnInit() {
		this.loadVentasAnuales();
	}

	ngOnDestroy(): void {
		this.dataSuscription?.unsubscribe();
		this.chart?.destroy();
	}

	private loadVentasAnuales(): void {
		this.dataSuscription = this.ventasService.getComprasAnuales().subscribe({
			next: (data: IComprasAnualesResponse) => {
				if (!data || !data.comprasPorMes) {
					console.error('No se recibieron datos de ventas');
					return;
				}

				const labels = this.getMonthLabels(data.comprasPorMes);
				const totals = this.getVentasByMonth(data.comprasPorMes);
				this.createLineChart(labels, totals, data.anio, data.totalAnual);
			},
			error: (error) => {
				console.error('Error al cargar los datos de ventas', error);
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

	private getVentasByMonth(comprasPorMes: ComprasPorMes[]): number[] {
		return comprasPorMes.map((item) => parseFloat(item.total));
	}

	private createLineChart(labels: string[], totals: number[], year: number, totalAnual: string): void {
		const ctx = this.ventasChartRef.nativeElement.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Ventas Mensuales S/',
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
						text: `Ventas Anuales ${year} - Total: S/ ${totalAnual}`,
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
