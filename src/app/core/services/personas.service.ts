/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SoundService } from '../../shared/services/delete-entity.service';
import { URL_PERSONAS_ALL } from '../config/api/config.url';
import { IPersonaByIDResponse, IPersonaResponse } from '../interfaces/persona.interface';
import {
	ITipoPersonaClienteCombo,
	ITipoPersonaPersonalCombo,
	ITipoPersonaProveedorCombo,
} from '../interfaces/personas.interface';

@Injectable({
	providedIn: 'root',
})
export class PersonasService {
	private RENIEC_API = environment.RENIEC_URL;
	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _soundService: SoundService
	) {}

	findAllPersonas(page: number, limit: number, search: string = ''): Observable<IPersonaResponse> {
		const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('search', search);
		return this._httpClient.get<IPersonaResponse>(URL_PERSONAS_ALL, { params }).pipe(delay(400));
	}

	findOnePersona(id: string): Observable<IPersonaByIDResponse> {
		return this._httpClient.get<IPersonaByIDResponse>(`${URL_PERSONAS_ALL}/${id}`);
	}

	deletePersonaById(id: string): Observable<boolean> {
		return this._httpClient.delete(`${URL_PERSONAS_ALL}/${id}`).pipe(
			tap(() => this._soundService.playSound()),
			catchError(() => of(false)),
			map(() => true)
		);
	}
	createPersonas(data: any): Observable<any> {
		return this._httpClient.post<any>(URL_PERSONAS_ALL, data);
	}

	updatePersonasGeneral(id: string, data: any): Observable<any> {
		return this._httpClient.patch<any>(`${URL_PERSONAS_ALL}/${id}`, data);
	}

	getPersonasByPersonal(): Observable<ITipoPersonaPersonalCombo[]> {
		return this._httpClient.get<ITipoPersonaPersonalCombo[]>(`${URL_PERSONAS_ALL}/personal`);
	}

	getPersonasByCliente(): Observable<ITipoPersonaClienteCombo[]> {
		return this._httpClient.get<ITipoPersonaClienteCombo[]>(`${URL_PERSONAS_ALL}/cliente`);
	}

	getPersonasByProveedor(): Observable<ITipoPersonaProveedorCombo[]> {
		return this._httpClient.get<ITipoPersonaProveedorCombo[]>(`${URL_PERSONAS_ALL}/proveedor`);
	}
}
