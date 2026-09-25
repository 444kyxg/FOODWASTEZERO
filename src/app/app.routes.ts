import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'alimentos',
    loadComponent: () => import('./pages/alimentos/alimentos.component').then(m => m.AlimentosComponent)
  },
  {
    path: 'alimentos/:id',
    loadComponent: () => import('./pages/alimento-detalhes/alimento-detalhes.component').then(m => m.AlimentoDetalhesComponent)
  },
  {
    path: 'ongs',
    loadComponent: () => import('./pages/ongs/ongs.component').then(m => m.OngsComponent)
  },
  {
    path: 'comunidade',
    loadComponent: () => import('./pages/comunidade/comunidade.component').then(m => m.ComunidadeComponent)
  },
  {
    path: 'politica-privacidade',
    loadComponent: () => import('./pages/politica-privacidade/politica-privacidade.component').then(m => m.PoliticaPrivacidadeComponent)
  },
  {
    path: 'painel',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/painel/painel.component').then(m => m.PainelComponent)
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'ong',
    canActivate: [authGuard, roleGuard(['ong'])],
    children: [
      {
        path: 'lotes',
        loadComponent: () => import('./pages/painel/painel.component').then(m => m.PainelComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
      },
      { path: '', redirectTo: 'lotes', pathMatch: 'full' }
    ]
  },
  {
    path: 'consumidor',
    canActivate: [authGuard, roleGuard(['consumidor'])],
    children: [
      {
        path: 'alimentos',
        loadComponent: () => import('./pages/alimentos/alimentos.component').then(m => m.AlimentosComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
      },
      { path: '', redirectTo: 'alimentos', pathMatch: 'full' }
    ]
  },
  {
    path: 'estabelecimento',
    canActivate: [authGuard, roleGuard(['estabelecimento'])],
    children: [
      {
        path: 'cadastrar-lote',
        loadComponent: () => import('./pages/alimento-cadastro/alimento-cadastro.component').then(m => m.AlimentoCadastroComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
      },
      { path: '', redirectTo: 'cadastrar-lote', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];