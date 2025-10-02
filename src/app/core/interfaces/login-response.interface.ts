// export interface IResponseSingIn {
// 	user: User;
// 	access_token: string;
// }

// export interface User {
// 	id_personal: string;
// 	email: string;
// 	estado: boolean;
// 	personal_img: string;
// 	tb_personas: TBPersonas;
// 	tb_rol: TBRol;
// }

// export interface TBPersonas {
// 	id_persona: string;
// 	nombres: string;
// }

// export interface TBRol {
// 	id_rol: number;
// 	nombre_rol: string;
// }
// export interface IResponseSingIn {
// 	personal: Personal;
// 	access_token: string;
// }

// export interface Personal {
// 	id_personal: string;
// 	id_persona: string;
// 	id_rol: string;
// 	email: string;
// 	estado: boolean;
// 	personal_img: string;
// }

export interface IResponseSingIn {
	personal: Personal;
	access_token: string;
}

export interface Personal {
	id_personal: string;
	email: string;
	estado: boolean;
	personal_img: string;
	id_rol: string;
	tb_personas: TBPersonas;
	tb_rol: TBRol;
	rol: string;
	permisos: Permiso[];
}

export interface Permiso {
	modulo: string;
	permisos: Permisos;
}

export interface Permisos {
	crear: boolean;
	leer: boolean;
	actualizar: boolean;
	eliminar: boolean;
}

export interface TBPersonas {
	nombres: string;
	apellido_paterno: string;
	apellido_materno: string;
}

export interface TBRol {
	nombre_rol: string;
	tb_permiso: TBPermiso[];
}

export interface TBPermiso {
	tb_modulo: TBModulo;
	puede_crear: number;
	puede_leer: number;
	puede_actualizar: number;
	puede_eliminar: number;
}

export interface TBModulo {
	nombre_modulo: string;
}
