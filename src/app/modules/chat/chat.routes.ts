import { Routes } from '@angular/router';

export const CHAT_GPT_ROUTES: Routes = [
	{
		path: 'chat-gpt-page',
		loadComponent: () => import('./pages/chat-page/chat-page.component'),
		data: {
			breadcrumb: 'CHAT GPT',
		},
	},
	{
		path: '**',
		redirectTo: 'chat-gpt-page',
	},
];
