import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
	selector: 'app-recapcha',
	standalone: true,
	imports: [],
	template: ``,
})
export class RecapchaComponent {
	@Output() tokenObtained = new EventEmitter<string>();
	private recaptChaService = inject(ReCaptchaV3Service);

	executeRecaptcha(action: string = 'login') {
		this.recaptChaService.execute(action).subscribe((token) => {
			this.tokenObtained.emit(token);
		});
	}
}
