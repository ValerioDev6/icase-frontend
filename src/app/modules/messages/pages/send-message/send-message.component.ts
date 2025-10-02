import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MessageService } from '../../../../core/services/message.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
	selector: 'app-send-message',
	standalone: true,
	imports: [FormsModule, NzInputModule, NzButtonModule, NzCardModule, NzBreadCrumbModule, NzAvatarModule, NzIconModule],
	templateUrl: './send-message.component.html',
	styleUrl: './send-message.component.scss',
})
export default class SendMessageComponent {
	phoneNumber: string = '';
	inputPhoneNumber: string = '';
	currentMessage: string = '';
	messages: Array<{ id: number; text: string; sent: boolean }> = [];
	private messageCounter = 0;

	constructor(
		private messageService: MessageService,
		private nzMessageService: NzMessageService
	) {}

	setPhoneNumber() {
		// Validación básica del número
		const cleanNumber = this.inputPhoneNumber.replace(/\D/g, '');
		if (cleanNumber.length < 11) {
			this.nzMessageService.error('El número debe tener al menos 11 dígitos');
			return;
		}
		this.phoneNumber = cleanNumber;
	}

	changeNumber() {
		this.phoneNumber = '';
		this.inputPhoneNumber = '';
		this.messages = [];
	}

	sendMessage() {
		if (!this.currentMessage.trim()) return;

		const messageText = this.currentMessage;
		this.messages.push({
			id: ++this.messageCounter,
			text: messageText,
			sent: true,
		});

		this.currentMessage = '';

		this.messageService.sendMessage(this.phoneNumber, messageText).subscribe({
			next: () => {
				this.nzMessageService.success('Mensaje enviado correctamente');
			},
			error: (error) => {
				this.nzMessageService.error('Error al enviar el mensaje');
				console.error('Error:', error);
			},
		});
	}
}
