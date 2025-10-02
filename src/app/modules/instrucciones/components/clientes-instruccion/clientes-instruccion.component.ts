import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-clientes-instruccion',
	standalone: true,
	imports: [],
	templateUrl: './clientes-instruccion.component.html',
	styleUrl: './clientes-instruccion.component.scss',
})
export class ClientesInstruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_clientes.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
