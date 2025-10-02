import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-sucursales-instruccion',
	standalone: true,
	imports: [],
	templateUrl: './sucursales-instruccion.component.html',
	styleUrl: './sucursales-instruccion.component.scss',
})
export class SucursalesInstruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_sucursales.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
