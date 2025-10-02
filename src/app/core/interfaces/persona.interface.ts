export interface IPersonaResponse {
	info: Info;
	personas: PersonaGeneral[];
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: string;
}

export interface PersonaGeneral {
	id_persona: string;
	nombres: string;
	correo?: string;
	id_tipo_persona: string;
	id_tipo_documento: string;
	id_sexo: string;
	fecha_nacimiento: string;
	id_direccion?: string;
	id_pais: string;
	id_tipo_telefono: string;
	apellido_paterno: string;
	apellido_materno: string;
	numero_documento: string;
	telefono?: string;
	razon_social: string;
	estado_documento: string;
	condicion_documento: string;
	distrito: string;
	provincia: string;
	departamento: string;
	tipo_persona: string;
	actividad_economica: string;
	direccion_persona?: string;
	tb_sexo: TbSexo;
	tb_tipo_persona: TbTipoPersona;
	tb_pais: TbPais;
	tb_tipo_documento: TbTipoDocumento;
	tb_telefonos_persona: TbTelefonosPersona[];
}

export interface TbSexo {
	id_sexo: string;
	sexo: string;
}

export interface TbTipoPersona {
	id_tipo_persona: string;
	tipo_persona: string;
	descripcion: string;
}

export interface TbPais {
	id_pais: string;
	nombre: string;
}

export interface TbTipoDocumento {
	id_tipo_documento: string;
	documento: string;
}

export interface TbTelefonosPersona {
	id_telefono: string;
	id_persona: string;
	id_tipo_telefono: string;
	numero_telefono: string;
}

// area de byId

export interface IPersonaByIDResponse {
	id_persona: string;
	nombres: string;
	correo: string;
	id_tipo_persona: string;
	id_tipo_documento: string;
	id_sexo: string;
	fecha_nacimiento: Date;
	id_direccion: string;
	id_pais: string;
	id_tipo_telefono: string;
	apellido_paterno: string;
	apellido_materno: string;
	numero_documento: string;
	telefono: null;
	razon_social: null;
	estado_documento: null;
	condicion_documento: null;
	distrito: null;
	provincia: null;
	departamento: null;
	tipo_persona: null;
	actividad_economica: null;
	direccion_persona: null;
	tb_sexo: TBSexo;
	tb_tipo_persona: TBTipoPersona;
	tb_pais: TBPais;
	tb_tipo_documento: TBTipoDocumento;
	tb_telefonos_persona: TBTelefonosPersona[];
}

export interface TBPais {
	id_pais: string;
	nombre: string;
}

export interface TBSexo {
	id_sexo: string;
	sexo: string;
}

export interface TBTelefonosPersona {
	id_telefono: string;
	id_persona: string;
	id_tipo_telefono: string;
	numero_telefono: string;
}

export interface TBTipoDocumento {
	id_tipo_documento: string;
	documento: string;
}

export interface TBTipoPersona {
	id_tipo_persona: string;
	tipo_persona: string;
	descripcion: string;
}
