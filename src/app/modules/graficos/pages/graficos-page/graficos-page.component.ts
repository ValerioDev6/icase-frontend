import { Component, inject, OnInit } from '@angular/core';
import { VentasAnualesComponent } from '../../components/ventas-anuales/ventas-anuales.component';
import { ComprasAnualesComponent } from '../../components/compras-anuales/compras-anuales.component';
import { DounoughtComprasComponent } from '../../components/dounought-compras/dounought-compras.component';
import { DounoughtVentasComponent } from '../../components/dounought-ventas/dounought-ventas.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SaleService } from '../../../../core/services/sale.service';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-graficos-page',
	standalone: true,
	imports: [
		VentasAnualesComponent,
		ComprasAnualesComponent,
		DounoughtComprasComponent,
		DounoughtVentasComponent,
		NzBreadCrumbModule,
	],
	templateUrl: './graficos-page.component.html',
	styleUrl: './graficos-page.component.scss',
})
export default class GraficosPageComponent implements OnInit {
	private readonly graficosService = inject(SaleService);

	totalCompras = '0.00';
	totalVentas = '0.00';

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		forkJoin({
			ventas: this.graficosService.getVentasAnuales(),
			compras: this.graficosService.getComprasAnuales(),
		}).subscribe({
			next: (resultado) => {
				this.totalVentas = resultado.ventas.totalAnual;
				this.totalCompras = resultado.compras.totalAnual;
			},
			error: (error) => {
				console.log('Error al cargar datos ', error);
			},
		});
	}
}
