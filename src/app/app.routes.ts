import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
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
    path: 'politica-privacidade',
    loadComponent: () => import('./pages/politica-privacidade/politica-privacidade.component').then(m => m.PoliticaPrivacidadeComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
