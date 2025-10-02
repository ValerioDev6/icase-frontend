import { Routes } from '@angular/router';

export const PERSONAS_ROUTES: Routes = [
	{
		path: 'lista-personas',
		loadComponent: () => import('./pages/listado-personas/listado-personas.component'),
		data: {
			breadcrumb: 'Listado de Personas',
		},
	},

	{
		path: 'crear-personas',
		loadComponent: () => import('./pages/crear-personas/crear-personas.component'),
		data: {
			breadcrumb: 'Crear Personas',
		},
	},

	{
		path: 'update/:id',
		loadComponent: () => import('./pages/update-personas/update-personas.component'),
		data: {
			breadcrumb: 'Actualizar Personas',
		},
	},

	{
		path: '**',
		redirectTo: 'lista-personas',
	},
];
