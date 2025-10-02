import { Routes } from '@angular/router';

export const RECOMENDACIONES_ROUTES: Routes = [
	{
		path: 'recomendaciones-lista',
		loadComponent: () => import('./pages/recomendaciones-page/recomendaciones-page.component'),
		data: {
			breadcrumb: 'Lista de Encuestas',
		},
	},

	{
		path: 'crear-encuesta/:id',
		loadComponent: () => import('./pages/crear-encuesta/crear-encuesta.component'),
		data: {
			breadcrumb: 'Encuesta',
		},
	},

	{
		path: '**',
		redirectTo: 'recomendaciones-lita',
	},
];
