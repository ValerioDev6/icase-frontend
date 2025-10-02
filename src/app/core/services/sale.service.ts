/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { ITotalesResponse } from '../interfaces/totales.interface';
import { URL_TOTALES_ALL } from '../config/api/config.url';
import { IResponseVentasHoySemanaMes } from '../interfaces/ventas.info';
import {
	IArticulosTopResponse,
	IComprasAnualesResponse,
	IComprasDiasResponse,
	IVentasAnualesResponse,
	IVentasResponseGrafico,
} from '../interfaces/sales.interface';

@Injectable({
	providedIn: 'root',
})
export class SaleService {
	isLoading$: Observable<boolean>;
	isLoadingSubject: BehaviorSubject<boolean>;

	constructor(private http: HttpClient) {
		this.isLoadingSubject = new BehaviorSubject<boolean>(false);
		this.isLoading$ = this.isLoadingSubject.asObservable();
	}

	getTotal(): Observable<ITotalesResponse> {
		return this.http
			.get<ITotalesResponse>(`${URL_TOTALES_ALL}`)
			.pipe(finalize(() => this.isLoadingSubject.next(false)));
	}

	geHoySemanaMes(): Observable<IResponseVentasHoySemanaMes> {
		return this.http
			.get<IResponseVentasHoySemanaMes>(`${URL_TOTALES_ALL}/consulta-mes-semana`)
			.pipe(finalize(() => this.isLoadingSubject.next(true)));
	}

	getArticulosVendidos(): Observable<IArticulosTopResponse[]> {
		return this.http
			.get<IArticulosTopResponse[]>(`${URL_TOTALES_ALL}/consulta-articulos`)
			.pipe(finalize(() => this.isLoadingSubject.next(true)));
	}

	getVentasMes(): Observable<IVentasResponseGrafico[]> {
		return this.http
			.get<IVentasResponseGrafico[]>(`${URL_TOTALES_ALL}/consulta-mes`)
			.pipe(finalize(() => this.isLoadingSubject.next(true)));
	}

	getComprasDias(): Observable<IComprasDiasResponse[]> {
		return this.http
			.get<IComprasDiasResponse[]>(`${URL_TOTALES_ALL}/consulta-compra-dias`)
			.pipe(finalize(() => this.isLoadingSubject.next(true)));
	}

	getStockAlertas(): Observable<any> {
		return this.http.get(`${URL_TOTALES_ALL}/consulta-alerta`);
	}
	getVentasAnuales(): Observable<IVentasAnualesResponse> {
		return this.http.get<IVentasAnualesResponse>(`${URL_TOTALES_ALL}/ventas-totales`);
	}

	getComprasAnuales(): Observable<IComprasAnualesResponse> {
		return this.http.get<IComprasAnualesResponse>(`${URL_TOTALES_ALL}/compras-totales`);
	}
}
