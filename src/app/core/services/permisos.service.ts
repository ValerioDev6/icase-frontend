/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { URL_ROLES_ALL } from '../config/api/config.url';
import { IModulesComborResponse } from '../interfaces/roles.interface';
import { IPermisosResponse, IPermisosSubmit } from '../interfaces/permisos.interface';

@Injectable({
	providedIn: 'root',
})
export class PermisosService {
	constructor(private readonly httpClient: HttpClient) {}

	createPermisos(data: any): Observable<any> {
		return this.httpClient.post<any>(`${URL_ROLES_ALL}/permisos`, data);
	}

	getAllModulos(): Observable<IModulesComborResponse[]> {
		return this.httpClient.get<IModulesComborResponse[]>(`${URL_ROLES_ALL}/combo/modulos`);
	}

	deletePermiso(id: string): Observable<boolean> {
		return this.httpClient.delete(`${URL_ROLES_ALL}/${id}/permiso`).pipe(
			catchError(() => of(false)),
			map(() => true)
		);
	}

	updatedPermiso(data: IPermisosResponse): Observable<IPermisosSubmit> {
		return this.httpClient.patch<IPermisosSubmit>(`${URL_ROLES_ALL}/${data.id_permiso}/permiso`, data);
	}

	getPermisoById(id: string): Observable<IPermisosResponse> {
		return this.httpClient.get<IPermisosResponse>(`${URL_ROLES_ALL}/${id}/permiso`);
	}
}
