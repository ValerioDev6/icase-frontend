import { Routes } from '@angular/router';

export const AJUSTE_INVENTARIO_ROUTES: Routes = [
	{
		path: 'lista-ajuste',
		loadComponent: () => import('./pages/ajuste-inventario/ajuste-inventario.component'),
		data: {
			breadcrumb: 'Ajuste Inventario',
		},
	},

	{
		path: 'crear-ajuste',
		loadComponent: () => import('./pages/create-ajuste-inventario/create-ajuste-inventario.component'),
		data: {
			breadcrumb: 'Crear Ajuste Inventario',
		},
	},

	{
		path: '**',
		redirectTo: 'lista-ajuste',
	},
];
