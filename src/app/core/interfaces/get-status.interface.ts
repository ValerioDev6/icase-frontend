// export interface CheckStatusResponse {
// 	id_personal: string;
// 	email: string;
// 	estado: boolean;
// 	personal_img: string;
// 	id_rol: number;
// 	persona: User;
// 	token: string;
// }

// export interface User {
// 	id_persona: string;
// 	nombres: string;
// 	apellido_paterno: string;
// 	apellido_materno: string;
// }

export interface CheckStatusResponse {
	id_personal: string;
	email: string;
	estado: boolean;
	personal_img: string;
	id_rol: string;
	rol: string;
	persona: Persona;
	permisos: Permiso[];
	access_token: string;
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

export interface Persona {
	nombres: string;
	apellido_paterno: string;
	apellido_materno: string;
	id_persona: string;
}
