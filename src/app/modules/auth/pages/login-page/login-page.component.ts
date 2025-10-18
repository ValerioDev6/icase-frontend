import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, viewChild } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EMPTY, catchError, finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/common/auth.service';
import { RecapchaComponent } from '../../components/recapcha/recapcha.component';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NzFormModule,
		NzInputModule,
		NzCheckboxModule,
		NzButtonModule,
		NzGridModule,
		NzIconModule,
		CommonModule,
		RecapchaComponent,
	],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
	private readonly _authService = inject(AuthService);
	readonly recaptcha = viewChild.required(RecapchaComponent);
	passwordVisible = false;
	isLoading = false;

	togglePasswordVisibility(): void {
		this.passwordVisible = !this.passwordVisible;
	}

	validateForm: FormGroup<{
		email: FormControl<string>;
		password: FormControl<string>;
		remember: FormControl<boolean>;
	}> = this.fb.group({
		email: ['valerio@gmail.com', [Validators.required, Validators.email]],
		password: ['valerio2003', [Validators.required]],
		remember: [true],
	});

	submitForm(): void {
		if (this.validateForm.valid) {
			this.recaptcha().executeRecaptcha();
		} else {
			Object.values(this.validateForm.controls).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity({ onlySelf: true });
				}
			});
		}
	}

	//
	onRecaptchaTokenObtained(token: string): void {
		this.isLoading = true;
		const { email, password } = this.validateForm.getRawValue();
		this._authService
			.login(email, password, token)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					const errorMessage = error.message;
					this.showError(errorMessage);
					return EMPTY;
				}),
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe();
	}

	private showError(message: string): void {
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: message,
		});
	}

	constructor(private fb: NonNullableFormBuilder) {}
}
