/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadService } from '../../../../core/services/uploads.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, of } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-upload-producto',
	standalone: true,
	imports: [CommonModule, NzUploadModule, NzButtonModule, NzIconModule],
	templateUrl: './upload-producto.component.html',
	styleUrl: './upload-producto.component.scss',
})
export class UploadProductoComponent {
	uploading = false;
	constructor(
		private uploadService: UploadService,
		private message: NzMessageService,
		private modalRef: NzModalRef
	) {}

	beforeUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
		this.uploading = false;

		const isCSV = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.name?.endsWith('.csv');
		const isLt10M = (file.size || 0) / 1024 / 1024 < 10;

		if (!isCSV) {
			this.message.error('Solo puedes subir archivos CSV');
			return of(false);
		}

		if (!isLt10M) {
			this.message.error('El archivo debe ser menor a 10MB');
			return of(false);
		}

		const nativeFile = file as unknown as File;
		this.uploadFile(nativeFile);
		return of(false);
	};

	uploadFile(file: File) {
		this.uploading = true;

		this.uploadService.uploadProductoExcel(file).subscribe({
			next: (response) => {
				this.message.success(`${response.count} productos insertados correctamente`);
				this.modalRef.close(true);

				this.uploading = false;
			},
			error: (error) => {
				this.message.error('El archivo ya fue insertado');
				console.error(error);
				this.uploading = false;
			},
		});
	}

	descargarCsvPrueba() {
		const rutaArchivo = 'assets/excel/productos.csv';
		const enlace = document.createElement('a');
		enlace.href = rutaArchivo;
		enlace.download = 'productos.csv';

		document.body.appendChild(enlace);
		enlace.click();
		document.body.removeChild(enlace);
	}
}
