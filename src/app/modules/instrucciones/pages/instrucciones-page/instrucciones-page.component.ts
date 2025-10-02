import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PermissionService } from '../../../../core/services/permission.service';
import { HasPermissionDirective } from '../../../../core/directives/permission.directive';
import { ClientesInstruccionComponent } from '../../components/clientes-instruccion/clientes-instruccion.component';
import { ComprasInstruccionComponent } from '../../components/compras-instruccion/compras-instruccion.component';
import { InformesInstruccionComponent } from '../../components/informes-instruccion/informes-instruccion.component';
import { ProductoModalComponent } from '../../components/producto-modal/producto-modal.component';
import { RecomendacionesInstruccionComponent } from '../../components/recomendaciones-instruccion/recomendaciones-instruccion.component';
import { SucursalesInstruccionComponent } from '../../components/sucursales-instruccion/sucursales-instruccion.component';
import { UsuariosInstruccionComponent } from '../../components/usuarios-instruccion/usuarios-instruccion.component';
import { VentasIntruccionComponent } from '../../components/ventas-intruccion/ventas-intruccion.component';

const NZ_MODULES = [
	NzCardModule,
	NzButtonModule,
	NzModalModule,
	NzBreadCrumbModule,
	NzIconModule,
	HasPermissionDirective,
];
@Component({
	selector: 'app-instrucciones-page',
	standalone: true,
	imports: [CommonModule, NZ_MODULES],
	templateUrl: './instrucciones-page.component.html',
	styleUrl: './instrucciones-page.component.scss',
})
export default class InstruccionesPageComponent {
	constructor(
		private modal: NzModalService,
		private permissionService: PermissionService
	) {}

	hasPermission([module, action]: [string, 'crear' | 'leer' | 'actualizar' | 'eliminar']): boolean {
		let hasPermission = false;
		this.permissionService.hasModulePermission(module, action).subscribe((result) => (hasPermission = result));
		return hasPermission;
	}

	openClientesManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Clientes',
			nzContent: ClientesInstruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openComprasManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Compras',
			nzContent: ComprasInstruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openInformesManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Informes',
			nzContent: InformesInstruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openProductosManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Productos',
			nzContent: ProductoModalComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openRecomendacionesManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Recomendaciones',
			nzContent: RecomendacionesInstruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openSucursalesManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Sucursales',
			nzContent: SucursalesInstruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openUsuariosManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Usuarios',
			nzContent: UsuariosInstruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}

	openVentasManual() {
		this.modal.create({
			nzTitle: 'Instrucciones Para modulo Ventas',
			nzContent: VentasIntruccionComponent,
			nzWidth: '70%',
			nzBodyStyle: {
				padding: '20px',
				overflow: 'auto',
			},
		});
	}
}
