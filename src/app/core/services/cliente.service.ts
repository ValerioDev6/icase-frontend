/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_CLIENTE_ALL } from '../config/api/config.url';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Cliente, IClienteComboResponse, IClienteResponse } from '../interfaces/cliente.interface';
import { IClienteByIDResponse } from '../interfaces/cliente-by-id.interface';
import { SoundService } from '../../shared/services/delete-entity.service';

@Injectable({
	providedIn: 'root',
})
export class ClienteService {
	constructor(
		private readonly _httpClient: HttpClient,
		private readonly soundService: SoundService
	) {}

	createPersonal(data: any): Observable<any> {
		return this._httpClient.post<any>(`${URL_CLIENTE_ALL}`, data).pipe(tap(() => this.soundService.playSound()));
	}
	getClienteData(page: number, limit: number, search: string = ''): Observable<IClienteResponse> {
		const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('search', search);
		return this._httpClient.get<IClienteResponse>(URL_CLIENTE_ALL, { params }).pipe(delay(600));
	}

	getClientesCombo(): Observable<IClienteComboResponse[]> {
		return this._httpClient.get<IClienteComboResponse[]>(`${URL_CLIENTE_ALL}/combo`);
	}

	getClienteById(id: string): Observable<Cliente> {
		return this._httpClient.get<Cliente>(`${URL_CLIENTE_ALL}/${id}`);
	}

	getClienteIdDetalle(id: string): Observable<IClienteByIDResponse> {
		return this._httpClient.get<IClienteByIDResponse>(`${URL_CLIENTE_ALL}/${id}`);
	}

	updatePersonal(data: Cliente): Observable<any> {
		return this._httpClient
			.patch<any>(`${URL_CLIENTE_ALL}/${data.id_cliente}`, data)
			.pipe(tap(() => this.soundService.playSound()));
	}

	deleteClienteById(id: string): Observable<boolean> {
		return this._httpClient.delete(`${URL_CLIENTE_ALL}/${id}`).pipe(
			tap(() => this.soundService.playSound()),
			catchError(() => of(false)),
			map(() => true)
		);
	}
}
