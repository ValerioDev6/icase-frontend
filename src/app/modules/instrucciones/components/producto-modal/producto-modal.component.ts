import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-producto-modal',
	standalone: true,
	imports: [],
	templateUrl: './producto-modal.component.html',
	styleUrl: './producto-modal.component.scss',
})
export class ProductoModalComponent {
	safePdfUrl: SafeResourceUrl;
	constructor(private sanitizer: DomSanitizer) {
		const pdfPath = 'assets/pdf/manual_productos.pdf';
		this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
	}
}
