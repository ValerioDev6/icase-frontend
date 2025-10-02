/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { URL_INVENTARIO_ALL } from '../config/api/config.url';
import { IResponseInventario } from '../interfaces/inventario.interface';

@Injectable({
	providedIn: 'root',
})
export class InventarioService {
	constructor(private readonly http: HttpClient) {}
	findAllInventario(page: number, limit: number, search: string = ''): Observable<IResponseInventario> {
		const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('search', search);
		return this.http.get<IResponseInventario>(URL_INVENTARIO_ALL, { params }).pipe(delay(500));
	}

	createInventario(data: any): Observable<any> {
		return this.http.post<any>(URL_INVENTARIO_ALL, data);
	}

	deleteInventario(id: string): Observable<boolean> {
		return this.http.delete(`${URL_INVENTARIO_ALL}/${id}`).pipe(
			catchError(() => of(false)),
			map(() => true)
		);
	}
}
