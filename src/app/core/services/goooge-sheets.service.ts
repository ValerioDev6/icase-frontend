import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { EncuestaSatisfaccion } from '../interfaces/google-sheets.interface';
import { environment } from '../../../environments/environment';
import { IEncuestaPaginationResponse } from '../interfaces/encuesta-pagination.interface';

@Injectable({
	providedIn: 'root',
})
export class GoogleSheetsService {
	private readonly http = inject(HttpClient);
	private readonly API_URL = `${environment.BACKEND_URL}/personal`;

	postDataEncuesta(idPersonal: string, encuesta: EncuestaSatisfaccion): Observable<EncuestaSatisfaccion> {
		const url = `${this.API_URL}/${idPersonal}/encuesta`;
		return this.http.post<EncuestaSatisfaccion>(url, encuesta).pipe(delay(600));
	}

	getEncuestaData(page: number, limit: number, search: string = ''): Observable<IEncuestaPaginationResponse> {
		const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('search', search);
		return this.http.get<IEncuestaPaginationResponse>(`${this.API_URL}/encuesta`, { params }).pipe(delay(1000));
	}
}
