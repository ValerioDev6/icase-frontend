import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SoundService {
	private alertSound = new Audio('assets/audios/sucess.mp3');
	playSound() {
		this.alertSound.currentTime = 0;
		this.alertSound.play().catch((err) => {
			console.warn('errror playind sound', err);
		});
	}
}
