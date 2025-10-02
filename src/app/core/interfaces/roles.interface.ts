export interface IRolesResponse {
	info: Info;
	roles: Role[];
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: null;
}

export interface Role {
	id_rol: string;
	nombre_rol: string;
	descripcion: string;
	estado: boolean;
	tb_permiso: TBPermiso[];
}

export interface TBPermiso {
	id_permiso: string;
	id_rol: string;
	id_modulo: string;
	puede_crear: number;
	puede_leer: number;
	puede_actualizar: number;
	puede_eliminar: number;
	estado: number;
	tb_modulo: TBModulo;
}

export interface TBModulo {
	id_modulo: string;
	nombre_modulo: string;
	descripcion: string;
	estado: number;
}

export interface IRoleSubmit {
	nombre_rol: string;
	descripcion: string;
	estado: boolean;
}
export interface IRolCombo {
	id_rol: string;
	nombre_rol: string;
	descripcion: string;
	estado: boolean;
}

export interface IModulesComborResponse {
	id_modulo: string;
	nombre_modulo: string;
	descripcion: string;
	estado: number;
}
