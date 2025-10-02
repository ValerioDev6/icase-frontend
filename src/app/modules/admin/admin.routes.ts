import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { roleGuard } from '../../core/guards/role.guard';
import { ERole } from '../../core/types/roles.enum';

export const ADMIN_ROUTES: Routes = [
	{
		path: '',
		component: MainLayoutComponent,

		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadChildren: () => import('../dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
				title: 'App - Dashboard',
			},
			{
				path: 'personal',
				loadChildren: () => import('../personal/personal.routes').then((m) => m.PERSONAL_ROUTES),
				title: 'App - Personal',
				data: {
					breadcrumb: 'Mantenimiento Personal',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'personal',
					permission: 'leer',
				},
			},

			{
				path: 'roles',
				loadChildren: () => import('../roles/roles.routes').then((m) => m.ROLES_ROUTES),
				title: 'App - Roles',
				data: {
					breadcrumb: 'Mantenimiento Roles',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'roles',
					permission: 'leer',
				},
			},

			{
				path: 'marcas',
				loadChildren: () => import('../marcas/marcas.routes').then((m) => m.MARCAS_ROUTES),
				title: 'App - Marcas',
				data: {
					breadcrumb: 'Mantenimiento Marcas',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'marcas',
					permission: 'leer',
				},
			},

			{
				path: 'genero',
				loadChildren: () => import('../sexo/sexo.routes').then((m) => m.SEXO_ROUTES),
				title: 'App - Genero',
				data: {
					breadcrumb: ' Mantenimiento Genero',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'genero',
					permission: 'leer',
				},
			},
			{
				path: 'categorias',
				loadChildren: () => import('../categorias/categorias.routes').then((m) => m.CATEGORIAS_ROUTES),
				title: 'App - Categorias',
				data: {
					breadcrumb: 'Mantenimiento Categorias',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'categorias',
					permission: 'leer',
				},
			},
			{
				path: 'productos',
				loadChildren: () => import('../productos/productos.routes').then((m) => m.PRODUCTOS_ROUTES),
				title: 'App - Productos',
				data: {
					breadcrumb: ' Mantenimiento Productos',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'productos',
					permission: 'leer',
				},
			},

			{
				path: 'sucursal',
				loadChildren: () => import('../sucursal/sucursal.routes').then((m) => m.SUCURSALES_ROUTES),
				title: 'App - Sucursal',
				data: {
					breadcrumb: 'Mantenimiento Sucursales',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'productos',
					permission: 'leer',
				},
			},
			{
				path: 'proveedor',
				loadChildren: () => import('../proveedor/proveedores.route').then((m) => m.PROVEEOR_ROUTES),
				title: 'App - Proveedores',
				data: {
					breadcrumb: 'Mantenimiento de Proveedores',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'proveedor',
					permission: 'leer',
				},
			},
			{
				path: 'cliente',
				loadChildren: () => import('../clientes/clientes.routes').then((m) => m.CLIENTES_ROUTES),
				title: 'App - Clientes',
				data: {
					breadcrumb: 'Mantenimiento de Clientes',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'cliente',
					permission: 'leer',
				},
			},
			{
				path: 'compras',
				loadChildren: () => import('../compras/compras.routes').then((m) => m.COMPRAS_ROUTES),
				title: 'App - Compras',
				data: {
					breadcrumb: 'Mantenimiento de Compras',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'compras',
					permission: 'leer',
				},
			},
			{
				path: 'ventas',
				loadChildren: () => import('../ventas/ventas.routes').then((m) => m.VENTAS_ROUTES),
				title: 'App - Ventas',
				data: {
					breadcrumb: 'Mantenimiento de Ventas',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'ventas',
					permission: 'leer',
				},
			},

			{
				path: 'kardex',
				loadChildren: () => import('../kardex/kardex.routes').then((m) => m.KARDEX_ROUTES),
				title: 'App - Kardex',
				data: { breadcrumb: 'KARDEX' },
			},

			{
				path: 'informes',
				loadChildren: () => import('../informes/informes.routes').then((m) => m.INFORMES_ROUTES),
				title: 'App - Informes',
				data: {
					breadcrumb: 'INFORMES',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'informes',
					permission: 'leer',
				},
			},

			{
				path: 'graficos',
				loadChildren: () => import('../graficos/graficos.routes').then((m) => m.GRAFICOS_ROUTES),
				title: 'App - Graficos',
				data: {
					breadcrumb: 'GRAFICOS',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'graficos',
					permission: 'leer',
				},
			},

			{
				path: 'recomendaciones',
				loadChildren: () => import('../recomendaciones/recomendaciones.routes').then((m) => m.RECOMENDACIONES_ROUTES),
				title: 'App - Recomendaciones',
				data: {
					breadcrumb: 'Recomendaciones',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'recomendaciones',
					permission: 'leer',
				},
			},

			{
				path: 'instrucciones',
				loadChildren: () => import('../instrucciones/instrucciones.routes').then((m) => m.INSTRUCCIONES_ROUTES),
				title: 'App - Instrucciones',
				canActivate: [roleGuard],
				data: {
					breadcrumb: 'Instrucciones',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'instrucciones',
					permission: 'leer',
				},
			},
			{
				path: 'inventario',
				loadChildren: () => import('../inventario/inventario.routes').then((m) => m.INVENTARIO_ROUTES),
				title: 'App - Inventario',
				canActivate: [roleGuard],
				data: {
					breadcrumb: 'inventario',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'instrucciones',
					permission: 'leer',
				},
			},
			{
				path: 'ajuste',
				loadChildren: () => import('../ajuste/ajuste.routes').then((m) => m.AJUSTE_INVENTARIO_ROUTES),
				title: 'App - Razon Ajuste',
				canActivate: [roleGuard],
				data: {
					breadcrumb: 'ajuste',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'instrucciones',
					permission: 'leer',
				},
			},

			{
				path: 'personas',
				loadChildren: () => import('../personas/personas.routes').then((m) => m.PERSONAS_ROUTES),
				title: 'App - Personas',
				canActivate: [roleGuard],
				data: {
					breadcrumb: 'Personas ',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'personas',
					permission: 'leer',
				},
			},

			{
				path: 'mensajes',
				loadChildren: () => import('../messages/message.routes').then((m) => m.MESSAGES_ROUTES),
				title: 'App - Mensajes',
				canActivate: [roleGuard],
				data: {
					breadcrumb: 'Mensajes',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'mensajes',
					permission: 'leer',
				},
			},

			{
				path: 'chat-gpt',
				loadChildren: () => import('../chat/chat.routes').then((m) => m.CHAT_GPT_ROUTES),
				title: 'App - Chat Gpt',
				canActivate: [roleGuard],
				data: {
					breadcrumb: 'CHAT GPT',
					allowedRoles: [ERole.PROGRAMADOR_ROLE, ERole.ROLE_ADMINISTRADOR, ERole.ROLE_VENDEDOR],
					module: 'chat-gpt',
					permission: 'leer',
				},
			},
		],
	},
];
