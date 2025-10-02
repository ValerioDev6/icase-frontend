export interface IEncuestaPaginationResponse {
	info: Info;
	encuestas: Encuesta[];
}

export interface Encuesta {
	id_encuesta: number;
	id_personal: string;
	fecha: Date;
	calificacion_general: number;
	recomendacion: number;
	calidad_sistema: number;
	facilidad_uso: number;
	atencion_cliente: number;
	funcionamiento_sistema: string;
	proceso_venta: number;
	comentarios: string;
	created_at: Date;
	tb_personal: TBPersonal;
}

export interface TBPersonal {
	id_personal: string;
	id_persona: string;
	id_rol: string;
	contrasenia: string;
	email: string;
	estado: boolean;
	personal_img: string;
	google_id: null;
	tb_personas: null;
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: null;
}
