import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-ventas-intruccion',
	standalone: true,
	imports: [],
	templateUrl: './ventas-intruccion.component.html',
	styleUrl: './ventas-intruccion.component.scss',
})
export class VentasIntruccionComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_venta.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
