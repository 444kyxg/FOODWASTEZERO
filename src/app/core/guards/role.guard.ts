import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard = (rolesPermitidas: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);

    const usuarioJson = localStorage.getItem('usuario');
    const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;
    const tipoUsuario = usuario?.tipo;

    if (tipoUsuario && rolesPermitidas.includes(tipoUsuario)) {
      return true;
    }

    router.navigate(['/painel']);
    return false;
  };
};