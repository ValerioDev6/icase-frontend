export interface InformeVentasResponse {
	info: Info;
	ventas: InformeVenta[];
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: null;
}

export interface InformeVenta {
	id_venta: string;
	fecha_venta: null;
	numero_documento: string;
	tipo_documento: string;
	subtotal: string;
	impuesto: string;
	precio_total: string;
	id_cliente: string;
	id_metodo_pago: string;
	id_sucursal: string;
	id_personal: string;
	estado_venta: string;
	serie_documento: string;
	observaciones: string;
	created_at: Date;
	updated_at: Date;
	tb_cliente: TBCliente;
	tb_personal: TBPersonal;
	tb_metodo_pago: TBMetodoPago;
}

export interface TBCliente {
	id_cliente: string;
	id_persona: string;
	estado: boolean;
	fecha_registro: Date;
	tipo_cliente: string;
	clasificacion: string;
	ultima_compra: Date;
	total_compras: string;
	observaciones: null;
	codigo_cliente: string;
	tb_personas: { [key: string]: null | string };
}

export interface TBMetodoPago {
	id_metodo_pago: string;
	nombre_metodo_pago: string;
	descripcion: string;
	estado: number;
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
	tb_personas: { [key: string]: null | string };
}
