import { Routes } from '@angular/router';

export const INSTRUCCIONES_ROUTES: Routes = [
	{
		path: 'instrucciones-lista',
		loadComponent: () => import('./pages/instrucciones-page/instrucciones-page.component'),
		data: {
			breadcrumb: 'Listado de Instrucciones',
		},
	},

	{
		path: '**',
		redirectTo: 'instrucciones-lista',
	},
];
