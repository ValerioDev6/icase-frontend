import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-informes-instruccion',
	standalone: true,
	imports: [],
	templateUrl: './informes-instruccion.component.html',
	styleUrl: './informes-instruccion.component.scss',
})
export class InformesInstruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_informes.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
