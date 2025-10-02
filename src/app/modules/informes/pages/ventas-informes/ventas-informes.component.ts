import { Component, OnInit } from '@angular/core';
import { InformesService } from '../../../../core/services/informes.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PeruvianCurrencyPipe } from '../../../../shared/pipes/pipe-currency.pipe';

const NZ_MODULES = [
	NzInputModule,
	NzTableModule,
	NzPaginationModule,
	NzIconModule,
	NzFormModule,
	NzLayoutModule,
	NzToolTipModule,
	NzBreadCrumbModule,
	NzTagModule,
	NzDatePickerModule,
	NzCardModule,
];

@Component({
	selector: 'app-ventas-informes',
	standalone: true,
	imports: [NZ_MODULES, ReactiveFormsModule, FormsModule, CommonModule, PeruvianCurrencyPipe],
	templateUrl: './ventas-informes.component.html',
	styleUrl: './ventas-informes.component.scss',
	providers: [DatePipe],
})
export default class VentasInformesComponent implements OnInit {
	constructor(
		private readonly informesService: InformesService,
		private readonly message: NzMessageService,
		private readonly datePipe: DatePipe
	) {}

	informe: any[] = [];

	loading = false;

	fechaInicio: string | null = null;
	fechaFin: string | null = null;
	page: number = 1;
	limit: number = 10;
	total: number = 0;
	dateRange: Date[] = [];

	ngOnInit(): void {
		this.loadDataInformeVentas();
	}

	loadDataInformeVentas(): void {
		this.loading = true;

		this.informesService
			.getVentasInformes(this.page, this.limit, this.fechaInicio || undefined, this.fechaFin || undefined)
			.subscribe({
				next: (response) => {
					this.informe = response.ventas;
					this.total = response.info.total;
					this.loading = false;
				},
				error: (error) => {
					this.message.error('Error al cargar los datos');
					this.loading = false;
					console.error(error);
				},
			});
	}

	filterByDateRange(): void {
		if (this.dateRange) {
			const [start, end] = this.dateRange;

			this.fechaInicio = start ? this.datePipe.transform(start, "yyyy-MM-dd'T'HH:mm:ss'Z'") : null;
			this.fechaFin = end ? this.datePipe.transform(end, "yyyy-MM-dd'T'HH:mm:ss'Z'") : null;
		} else {
			this.fechaInicio = null;
			this.fechaFin = null;
		}

		this.page = 1;
		this.loadDataInformeVentas();
	}

	clearFilters(): void {
		this.dateRange = [];
		this.fechaInicio = null;
		this.fechaFin = null;
		this.page = 1;
		this.loadDataInformeVentas();
	}

	onPageChange(page: number): void {
		this.page = page;
		this.loadDataInformeVentas();
	}

	downloadPDF(): void {
		this.informesService.getVentasInformeReport(this.fechaInicio || undefined, this.fechaFin || undefined).subscribe({
			next: (blob: Blob) => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = 'informe_venta.pdf';
				link.click();
				window.URL.revokeObjectURL(url);
			},
			error: (error) => {
				this.message.error('Error al descargar el PDF');
				console.error('Error downloading PDF:', error);
			},
		});
	}
}
