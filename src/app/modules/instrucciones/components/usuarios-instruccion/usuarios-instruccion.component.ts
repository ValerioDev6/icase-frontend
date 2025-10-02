import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-usuarios-instruccion',
	standalone: true,
	imports: [],
	templateUrl: './usuarios-instruccion.component.html',
	styleUrl: './usuarios-instruccion.component.scss',
})
export class UsuariosInstruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_usuarios.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
