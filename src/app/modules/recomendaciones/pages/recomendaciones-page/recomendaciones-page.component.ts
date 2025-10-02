import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { GoogleSheetsService } from '../../../../core/services/goooge-sheets.service';
import { Encuesta, IEncuestaPaginationResponse } from '../../../../core/interfaces/encuesta-pagination.interface';
const NZ_MODULES = [
	NzInputModule,
	NzIconModule,
	NzButtonModule,
	NzTableModule,
	NzPaginationModule,
	NzFormModule,
	NzLayoutModule,
	NzToolTipModule,
	NzSelectModule,
	NzDropDownModule,
	NzDividerModule,
	NzCardModule,
	NzTagModule,
	NzBreadCrumbModule,
	NzToolTipModule,
];
@Component({
	selector: 'app-recomendaciones-page',
	standalone: true,
	imports: [CommonModule, NZ_MODULES],
	templateUrl: './recomendaciones-page.component.html',
	styleUrl: './recomendaciones-page.component.scss',
})
export default class RecomendacionesPageComponent implements OnInit {
	private readonly googleSheetsService = inject(GoogleSheetsService);

	encuestas: Encuesta[] = [];
	loading = false;
	search: string = '';
	page: number = 1;
	limit: number = 10;
	total: number = 0;
	ngOnInit(): void {
		this.loadDataEncuesta();
	}
	loadDataEncuesta(): void {
		this.loading = true;
		this.googleSheetsService.getEncuestaData(this.page, this.limit, this.search).subscribe({
			next: (response: IEncuestaPaginationResponse) => {
				this.encuestas = response.encuestas;
				this.total = response.info.total;
				this.loading = false;
				console.log(response);
			},
			error: (err) => {
				console.error('Error al cargar encuestas', err);
				this.loading = false;
			},
		});
	}

	searchTo() {
		this.page = 1;
		this.loadDataEncuesta();
	}

	onPageChange(page: number) {
		this.page = page;
		this.loadDataEncuesta();
	}

	refreshPage() {
		this.loadDataEncuesta();
	}

	getCalificacionColor(calificacion: number): string {
		if (calificacion >= 4) return 'success'; // 4-5: Verde (Muy bueno)
		if (calificacion >= 3) return 'processing'; // 3: Azul (Regular)
		if (calificacion >= 2) return 'warning'; // 2: Amarillo (Bajo)
		return 'error'; // 1: Rojo (Muy bajo)
	}
}
