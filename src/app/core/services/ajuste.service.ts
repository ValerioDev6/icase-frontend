/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { URL_AJUSTES_ALL } from '../config/api/config.url';
import { IAjustesResponseData } from '../interfaces/ajuste.interface';

@Injectable({
	providedIn: 'root',
})
export class AjusteService {
	constructor(private readonly http: HttpClient) {}

	findAllAjustes(page: number, limit: number, search: string = ''): Observable<IAjustesResponseData> {
		const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('search', search);
		return this.http.get<IAjustesResponseData>(URL_AJUSTES_ALL, { params }).pipe(delay(500));
	}

	createAjuste(data: any): Observable<any> {
		return this.http.post<any>(URL_AJUSTES_ALL, data);
	}

	deleteAjusteById(id: string): Observable<boolean> {
		return this.http.delete(`${URL_AJUSTES_ALL}/${id}`).pipe(
			catchError(() => of(false)),
			map(() => true)
		);
	}
}
