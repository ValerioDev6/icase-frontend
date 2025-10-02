import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-recomendaciones-instruccion',
	standalone: true,
	imports: [],
	templateUrl: './recomendaciones-instruccion.component.html',
	styleUrl: './recomendaciones-instruccion.component.scss',
})
export class RecomendacionesInstruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_recomendaciones.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
