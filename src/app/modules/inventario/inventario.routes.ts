import { Routes } from '@angular/router';

export const INVENTARIO_ROUTES: Routes = [
	{
		path: 'inventario-lista',
		loadComponent: () => import('./pages/inventario-lista/inventario-lista.component'),
		data: {
			breadcrumb: 'Lista inventario',
		},
	},
	{
		path: 'create-inventario',
		loadComponent: () => import('./pages/crear-registro-inventario/crear-registro-inventario.component'),
		data: {
			breadcrumb: 'Creación de Inventario',
		},
	},
	{
		path: 'actualizar/:id',
		loadComponent: () => import('./pages/editar-registro-inventario/editar-registro-inventario.component'),
		data: {
			breadcrumb: 'Actualiza de Inventario',
		},
	},
	{
		path: '**',
		redirectTo: 'inventario-lista',
	},
];
