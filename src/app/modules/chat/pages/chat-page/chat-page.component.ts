/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ChatGptService } from '../../../../core/services/chat-gpt.service';

@Component({
	selector: 'app-chat-page',
	standalone: true,
	imports: [CommonModule, FormsModule, NzInputModule, NzButtonModule, NzSpinModule],
	templateUrl: './chat-page.component.html',
	styleUrl: './chat-page.component.scss',
})
export default class ChatPageComponent {
	messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
	userInput = '';
	loading = false;

	constructor(private chatGptService: ChatGptService) {}

	// async sendMessage() {
	// 	if (!this.userInput.trim() || this.loading) return;

	// 	const userMessage = this.userInput.trim();
	// 	this.messages.push({ role: 'user', content: userMessage });
	// 	this.userInput = '';
	// 	this.loading = true;

	// 	try {
	// 		const response: any = await this.chatGptService.generateResponse(this.messages).toPromise();

	// 		const assistantMessage = response.choices[0].message.content;
	// 		this.messages.push({
	// 			role: 'assistant',
	// 			content: assistantMessage,
	// 		});
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		this.messages.push({
	// 			role: 'assistant',
	// 			content: 'Lo siento, hubo un error al procesar tu mensaje.',
	// 		});
	// 	} finally {
	// 		this.loading = false;
	// 	}
	// }
}
