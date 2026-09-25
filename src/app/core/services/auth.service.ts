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

    const novo: Usuario & { senha: string } = {
      id: Date.now(),
      ...usuario
    };

    const novaLista = [...usuarios, novo];
    localStorage.setItem(USERS_KEY, JSON.stringify(novaLista));
    localStorage.setItem(SESSION_KEY, JSON.stringify(novo));

    this.usuario.set(novo);

    window.dispatchEvent(new Event('storage'));

    return true;
  }

  login(email: string, senha: string): boolean {
    const usuarios = this.getUsuarios();
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) return false;

    localStorage.setItem(SESSION_KEY, JSON.stringify(usuarioEncontrado));
    this.usuario.set(usuarioEncontrado);
    return true;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.usuario.set(null);
    this.router.navigate(['/']);
  }

  atualizarFotoPerfil(fotoBase64: string): void {
    const atual = this.usuario();
    if (!atual) return;

    const usuarioAtualizado = { ...atual, imagem: fotoBase64, foto: fotoBase64 };

    localStorage.setItem(SESSION_KEY, JSON.stringify(usuarioAtualizado));

    const usuarios = this.getUsuarios();
    const index = usuarios.findIndex(u => u.id === atual.id || u.email === atual.email);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], imagem: fotoBase64, foto: fotoBase64 };
      localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
    }

    this.usuario.set(usuarioAtualizado);

    window.dispatchEvent(new Event('storage'));
  }

  isAuthenticated(): boolean {
    return this.estaLogado();
  }

  getCurrentUser(): Usuario | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as Usuario : null;
  }

  private getUsuarios(): Array<any> {
    const raw = localStorage.getItem(USERS_KEY);

    if (raw) return JSON.parse(raw);

    const demo = [{
      id: 1,
      nome: 'Administrador',
      email: 'teste@email.com',
      senha: '123456',
      tipo: 'consumidor'
    }];

    localStorage.setItem(USERS_KEY, JSON.stringify(demo));
    return demo;
  }
}