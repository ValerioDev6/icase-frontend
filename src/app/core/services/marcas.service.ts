import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { IMarcaComboBox, IMarcasResponseData, IMarcaSubmit, Marca } from '../interfaces/marcas.interface';
import { URL_MARCAS_ALL } from '../config/api/config.url';
import { SoundService } from '../../shared/services/delete-entity.service';

@Injectable({
	providedIn: 'root',
})
export class MarcasService {
	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _soundService: SoundService
	) {}

	getMarcasData(page: number, limit: number, search: string = ''): Observable<IMarcasResponseData> {
		const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('search', search);
		return this._httpClient.get<IMarcasResponseData>(URL_MARCAS_ALL, { params }).pipe(delay(400));
	}

	getComboBoxMarcasAll(): Observable<IMarcaComboBox[]> {
		return this._httpClient.get<IMarcaComboBox[]>(`${URL_MARCAS_ALL}/combo`);
	}
	createMarcas(data: IMarcaSubmit): Observable<IMarcaSubmit> {
		return this._httpClient.post<IMarcaSubmit>(URL_MARCAS_ALL, data).pipe(tap(() => this._soundService.playSound()));
	}

	getMarcaById(id: string): Observable<Marca> {
		return this._httpClient.get<Marca>(`${URL_MARCAS_ALL}/${id}`);
	}

	updateMarca(data: Marca): Observable<IMarcaSubmit> {
		return this._httpClient
			.patch<IMarcaSubmit>(`${URL_MARCAS_ALL}/${data.id_marca}`, data)
			.pipe(tap(() => this._soundService.playSound()));
	}

	deleteMarcaById(id: string): Observable<boolean> {
		return this._httpClient.delete(`${URL_MARCAS_ALL}/${id}`).pipe(
			tap(() => this._soundService.playSound()),
			catchError(() => of(false)),
			map(() => true)
		);
	}
}
