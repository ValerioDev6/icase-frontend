export interface IResponseInventario {
	info: Info;
	inventario: Inventario[];
}

export interface Info {
	page: number;
	limit: number;
	total: number;
	next: string;
	prev: null;
}

export interface Inventario {
	id_inventario: string;
	id_producto: string;
	id_sucursal: string;
	cantidad: number;
	comentarios: string;
	fecha_creacion: Date;
	updated_at: Date;
	tipo_movimiento: string;
	stock_anterior: number;
	stock_nuevo: number;
	tb_productos: TBProductos;
	tb_sucursales: TBSucursales;
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

export interface TBSucursales {
	id_sucursal: string;
	nombre_sucursal: string;
	telefono: string;
	email: string;
	id_direccion: string;
	id_tipo_telefono: string;
	id_pais: string;
}
