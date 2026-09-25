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

  /**
   * Realiza o cadastro de novos usuários (Consumidor, Estabelecimento ou ONG)
   */
  cadastrar(usuario: Omit<Usuario, 'id'> & { senha: string }): boolean {
    const usuarios = this.getUsuarios();

    // Verifica se já existe um usuário com o mesmo e-mail
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

    // Notifica outros componentes da atualização
    window.dispatchEvent(new Event('storage'));

    return true;
  }

  /**
   * Realiza a autenticação
   */
  login(email: string, senha: string): boolean {
    const usuarios = this.getUsuarios();
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) return false;

    localStorage.setItem(SESSION_KEY, JSON.stringify(usuarioEncontrado));
    this.usuario.set(usuarioEncontrado);
    return true;
  }

  /**
   * Encerra a sessão
   */
  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.usuario.set(null);
    this.router.navigate(['/']);
  }

  /**
   * Atualiza a foto de perfil do usuário logado
   */
  atualizarFotoPerfil(fotoBase64: string): void {
    const atual = this.usuario();
    if (!atual) return;

    const usuarioAtualizado = { ...atual, imagem: fotoBase64, foto: fotoBase64 };

    // 1. Atualiza na sessão ativa
    localStorage.setItem(SESSION_KEY, JSON.stringify(usuarioAtualizado));

    // 2. Atualiza na lista global de usuários
    const usuarios = this.getUsuarios();
    const index = usuarios.findIndex(u => u.id === atual.id || u.email === atual.email);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], imagem: fotoBase64, foto: fotoBase64 };
      localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
    }

    // 3. Atualiza o signal reativo
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