import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const USERS_KEY = 'fwz_usuarios';
const SESSION_KEY = 'fwz_usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  usuario = signal<Usuario | null>(this.getCurrentUser());

  estaLogado = computed(() => this.usuario() !== null);
  tipoUsuario = computed(() => this.usuario()?.tipo || null);

  constructor(private router: Router) {}

  cadastrar(usuario: Omit<Usuario, 'id'> & { senha: string }): boolean {
    const usuarios = this.getUsuarios();

    if (usuarios.some(u => u.email === usuario.email)) {
      return false;
    }

    const novo = {
      id: Date.now(),
      ...usuario
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...usuarios, novo]));
    localStorage.setItem(SESSION_KEY, JSON.stringify(novo));
    this.usuario.set(novo);
    return true;
  }

  login(email: string, senha: string): boolean {
    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) return false;

    localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
    this.usuario.set(usuario);
    return true;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.usuario.set(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.estaLogado();
  }

  getCurrentUser(): Usuario | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as Usuario : null;
  }

  private getUsuarios(): Array<Usuario & { senha: string }> {
    const raw = localStorage.getItem(USERS_KEY);

    if (raw) return JSON.parse(raw);

    const demo = [{
      id: 1,
      nome: 'Administrador',
      email: 'teste@email.com',
      senha: '123456',
      tipo: 'consumidor' as const
    }];

    localStorage.setItem(USERS_KEY, JSON.stringify(demo));
    return demo;
  }
}