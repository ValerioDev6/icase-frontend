import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-compras-instruccion',
	standalone: true,
	imports: [],
	templateUrl: './compras-instruccion.component.html',
	styleUrl: './compras-instruccion.component.scss',
})
export class ComprasInstruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_compras.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
