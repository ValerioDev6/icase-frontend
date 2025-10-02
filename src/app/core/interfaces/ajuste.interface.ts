export interface IAjustesResponseData {
	info: Info;
	ajustes: Ajuste[];
}

export interface Ajuste {
	id_ajuste: string;
	razon_ajuste: string;
	cantidad_ajuste: number;
	stock_anterior: number;
	stock_nuevo: number;
	id_producto: string;
	nota: string;
	fecha_ajuste: Date;
	estado: boolean;
	tipo_ajuste: string;
	tb_productos: TBProductos;
}

export interface TBProductos {
	id_producto: string;
	nombre_producto: string;
	descripcion: string;
	stock: number;
	id_categoria: string;
	fecha_creacion: Date;
	id_marca: string;
	is_active: boolean;
	precio_compra: string;
	precio_venta: string;
	producto_img: string;
	fecha_ingreso: Date;
	codigo_producto: string;
	updated_at: Date;
	estado_produto: string;
	id_sucursal: string;
	id_tipo_propietario: string;
	precio_base_sin_igv: null;
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: null;
}
