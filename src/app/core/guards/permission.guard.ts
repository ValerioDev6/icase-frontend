// permission.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/common/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const permissionGuard: CanActivateFn = (route, state) => {
	const router: Router = inject(Router);
	const authService = inject(AuthService);

	const requiredModule = route.data['module'];
	const requiredPermission = route.data['permission'];

	return authService.user$.pipe(
		map((user) => {
			if (!user) return router.createUrlTree(['/auth/login']);

			const modulePermission = user.permisos.find((p) => p.modulo === requiredModule);
			if (!modulePermission) return false;

			return modulePermission.permisos[requiredPermission] || false;
		})
	);
};
