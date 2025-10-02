import { Routes } from '@angular/router';

export const MESSAGES_ROUTES: Routes = [
	{
		path: 'message-chat',
		loadComponent: () => import('./pages/send-message/send-message.component'),
		data: {
			breadcrumb: 'Enviar Mensaje',
		},
	},
	{
		path: '**',
		redirectTo: 'message-chat',
	},
];
