export interface IResponseVentasHoySemanaMes {
	ventas_hoy: VentasHoy;
	ventas_semana: Ventas;
	ventas_mes: Ventas;
}

export interface VentasHoy {
	total_ventas: number;
	monto_total: number;
}

export interface Ventas {
	monto_total: number;
}
