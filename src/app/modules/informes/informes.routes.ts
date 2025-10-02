import { Routes } from '@angular/router';

export const INFORMES_ROUTES: Routes = [
	{
		path: 'informes-compras',
		loadComponent: () => import('./pages/compras-informes/compras-informes.component'),
		data: {
			breadcrumb: 'Informes Compras',
		},
	},

	{
		path: 'informes-ventas',
		loadComponent: () => import('./pages/ventas-informes/ventas-informes.component'),
		data: {
			breadcrumb: 'Informes Venta',
		},
	},
	{
		path: '**',
		redirectTo: 'informes-ventas',
	},
];
