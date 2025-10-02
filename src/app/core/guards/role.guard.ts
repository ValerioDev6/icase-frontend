import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/common/auth.service';
import { LocalStorageService } from '../services/storage/local-storage.service';
import { ERole } from '../types/roles.enum';

export const roleGuard: CanActivateFn = (route, _state) => {
	const router: Router = inject(Router);
	const _authService = inject(AuthService);
	const _localStorageService = inject(LocalStorageService);

	const allowedRoles: ERole[] = route.data['allowedRoles'] || [];

	return _authService.user$.pipe(
		map((user) => {
			if (user && allowedRoles.includes(user.tb_rol.nombre_rol as ERole)) {
				return true;
			}
			_localStorageService.clearAuthData();
			location.reload();
			return router.createUrlTree(['/auth/login']);
		})
	);
};
