import { Routes } from '@angular/router';

export const GRAFICOS_ROUTES: Routes = [
	{
		path: 'graficos-page',
		loadComponent: () => import('./pages/graficos-page/graficos-page.component'),
		data: {
			breadcrumb: 'Graficos Lista ',
		},
	},
	{
		path: '**',
		redirectTo: 'graficos-page',
	},
];
