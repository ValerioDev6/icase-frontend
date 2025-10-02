import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	private readonly API_URL = environment.BACKEND_URL;

	constructor(private readonly httpClient: HttpClient) {}

	sendMessage(phoneNumber: string, message: string) {
		return this.httpClient.post(`${this.API_URL}/messages/send`, {
			phoneNumber,
			message,
		});
	}
}
