export interface IPermisosResponse {
	id_permiso: string;
	id_rol: string;
	id_modulo: string;
	puede_crear: number;
	puede_leer: number;
	puede_actualizar: number;
	puede_eliminar: number;
	estado: number;
}

export interface IPermisosSubmit {
	id_rol: string;
	id_modulo: string;
	puede_crear: number;
	puede_leer: number;
	puede_actualizar: number;
	puede_eliminar: number;
	estado: number;
}
