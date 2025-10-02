export interface IComprasInformeResponse {
	info: Info;
	compras: Compra[];
}

export interface Compra {
	id_compra: string;
	id_metodo_pago: string;
	proveedor_id: string;
	proveedor_ruc: string;
	proveedor_correo: string;
	numero_documento: string;
	compra_subtotal: string;
	compra_igv: string;
	compra_total: string;
	compra_comentario: string;
	fecha_compra: Date;
	tb_proveedores: TBProveedores;
	tb_metodo_pago: TBMetodoPago;
}

export interface TBMetodoPago {
	id_metodo_pago: string;
	nombre_metodo_pago: string;
	descripcion: string;
	estado: number;
}

export interface TBProveedores {
	id_proveedor: string;
	id_persona: string;
	estado_proveedor: string;
	created_at: Date;
	updated_at: Date;
	nombre_comercial: string;
	total_compras: string;
	ultima_compra: Date;
	tb_personas: { [key: string]: null | string };
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: null;
}
