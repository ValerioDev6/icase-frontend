// articulos top

export interface IArticulosTopResponse {
	_sum: Sum;
	id_producto: string;
	nombre: string;
}

export interface Sum {
	cantidad: number;
}

// ventas mes

export interface IVentasResponseGrafico {
	mes: number;
	total_ventas: number;
	numero_ventas: number;
}

// compas dias

export interface IComprasDiasResponse {
	dia: number;
	total: number;
}

// ventas al año

export interface IVentasAnualesResponse {
	anio: number;
	totalAnual: string;
	ventasPorMes: VentasPorMes[];
}

export interface VentasPorMes {
	mes: number;
	total: string;
}

// compras al año

export interface IComprasAnualesResponse {
	anio: number;
	totalAnual: string;
	comprasPorMes: ComprasPorMes[];
}

export interface ComprasPorMes {
	mes: number;
	total: string;
}
