import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withViewTransitions } from '@angular/router';
import { provideNzConfig } from 'ng-zorro-antd/core/config';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';
import { AuthInterceptorHttpService } from './core/interceptors/api.interceptor';
import { provideNzIcons } from './icons-provider';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withViewTransitions(), withComponentInputBinding(), withHashLocation()),
		provideNzIcons(),
		importProvidersFrom(RecaptchaV3Module),
		{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcY6QwqAAAAAGefcmy6RLIjZDmekvtmUK3ZCkjS' },
		provideNzI18n(es_ES),
		importProvidersFrom(FormsModule, ReactiveFormsModule),
		provideAnimationsAsync(),
		provideNzConfig({
			message: {
				nzTop: 24,
				nzDuration: 3000,
				nzMaxStack: 7,
				nzPauseOnHover: true,
				nzAnimate: true,
				nzDirection: 'ltr',
			},
		}),
		provideHttpClient(withInterceptors([AuthInterceptorHttpService])),
	],
};

// mysql-c79f8f8
