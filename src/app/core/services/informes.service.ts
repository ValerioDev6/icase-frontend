import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformeVentasResponse } from '../interfaces/informe_ventas.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IComprasInformeResponse } from '../interfaces/informe-compras.interface';

@Injectable({
	providedIn: 'root',
})
export class InformesService {
	private readonly API_URL = environment.BACKEND_URL;

	constructor(private readonly _http: HttpClient) {}

	getVentasInformes(
		page: number = 1,
		limit: number = 10,
		fechaInicio?: string,
		fechaFin?: string
	): Observable<InformeVentasResponse> {
		let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

		if (fechaInicio) params = params.set('fecha_inicio', fechaInicio);
		if (fechaFin) params = params.set('fecha_fin', fechaFin);

		return this._http.get<InformeVentasResponse>(`${this.API_URL}/informes/ventas`, { params });
	}

	getVentasInformeReport(fechaInicio?: string, fechaFin?: string): Observable<Blob> {
		let params = new HttpParams();

		if (fechaInicio) params = params.set('fecha_inicio', fechaInicio);
		if (fechaFin) params = params.set('fecha_fin', fechaFin);

		return this._http.get(`${this.API_URL}/informes/ventas/reporte`, {
			params,
			responseType: 'blob',
		});
	}

	getComprasInformes(
		page: number = 1,
		limit: number = 10,
		fechaInicio?: string,
		fechaFin?: string
	): Observable<IComprasInformeResponse> {
		let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
		if (fechaInicio) params = params.set('fecha_inicio', fechaInicio);
		if (fechaFin) params = params.set('fecha_fin', fechaFin);

		return this._http.get<IComprasInformeResponse>(`${this.API_URL}/informes/compras`, { params });
	}

	getComprasInformeReport(fechaInicio?: string, fechaFin?: string): Observable<Blob> {
		let params = new HttpParams();

		if (fechaInicio) params = params.set('fecha_inicio', fechaInicio);
		if (fechaFin) params = params.set('fecha_fin', fechaFin);

		return this._http.get(`${this.API_URL}/informes/compras/informe`, {
			params,
			responseType: 'blob',
		});
	}
}
