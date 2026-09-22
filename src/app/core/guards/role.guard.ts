import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const roleGuard = (rolesPermitidas: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const notification = inject(NotificationService);
    const router = inject(Router);

    const tipoUsuario = authService.usuario()?.tipo;

    if (tipoUsuario && rolesPermitidas.includes(tipoUsuario)) {
      return true;
    }

    notification.show('Acesso negado: você não tem permissão para acessar esta área.', 'erro');
    router.navigate(['/painel']);
    return false;
  };
};