import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  template: `
    <section class="profile">
      <span>MINHA CONTA</span>
      <div class="profile-card" *ngIf="user">
        <div class="avatar">{{ (user?.nome?.[0] || 'U') | uppercase }}</div>
        
        <div *ngIf="editando; else modoVisualizacao" class="edit-box">
          <label for="nome-input">Nome ou Organização</label>

          <input 
            id="nome-input"
            type="text" 
            [(ngModel)]="novoNome" 
            placeholder="Digite o novo nome"
            class="input-nome">

          <div class="actions-btn">
            <button class="btn-salvar" (click)="salvarNome()">Salvar</button>
            <button class="btn-cancelar" (click)="cancelarEdicao()">Cancelar</button>
          </div>
        </div>

        <ng-template #modoVisualizacao>
          <h1>{{ user?.nome }}</h1>
          <button class="btn-editar" (click)="iniciarEdicao()">✏️ Alterar nome</button>
        </ng-template>

        <p class="email">{{ user?.email }}</p>
        <div class="type">{{ user?.tipo }}</div>

        <p *ngIf="mensagemSucesso" class="success-msg">{{ mensagemSucesso }}</p>
        <p class="note">Dados simulados localmente para o projeto acadêmico.</p>
      </div>
    </section>
  `,
  styles: [`
    .profile{padding:80px 7vw;min-height:60vh;background:#f2f7f2}
    .profile>span{font-size:11px;font-weight:800;letter-spacing:.14em;color:#2e8247}
    .profile-card{background:#fff;max-width:600px;margin:25px 0;padding:35px;border-radius:22px;border:1px solid #e1e9e2;text-align:center}
    .avatar{width:80px;height:80px;margin:auto;border-radius:50%;background:#dcefdc;color:#247b3e;display:grid;place-items:center;font:700 32px 'Space Grotesk'}
    
    .profile-card h1{font:700 32px 'Space Grotesk';margin:15px 0 5px}
    .email{color:#758078;margin-bottom:12px}
    .type{display:inline-block;background:#edf6ee;color:#247b3e;border-radius:20px;padding:8px 13px;font-size:12px;font-weight:800;text-transform:capitalize}
    
    .btn-editar{background:none;border:none;color:#247b3e;font-weight:700;font-size:13px;cursor:pointer;margin-bottom:10px;text-decoration:underline}
    
    .edit-box{margin:18px 0;text-align:left}
    .edit-box label{display:block;font-size:12px;font-weight:700;color:#556057;margin-bottom:6px}
    .input-nome{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #c8d6c9;border-radius:10px;font:inherit;font-weight:600;margin-bottom:12px}
    .actions-btn{display:flex;gap:10px}
    .btn-salvar{flex:1;background:#247e40;color:#fff;border:0;padding:10px;border-radius:8px;font-weight:800;cursor:pointer}
    .btn-cancelar{background:#e2eae3;color:#4a544c;border:0;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer}
    
    .success-msg{color:#2e7d32;font-weight:700;font-size:13px;margin-top:15px}
    .note{font-size:12px;margin-top:25px;color:#8a958c}
  `]
})
export class PerfilComponent implements OnInit {
  user: any = null;
  editando = false;
  novoNome = '';
  mensagemSucesso = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    const auth = this.auth as any;
    this.user = auth.getCurrentUser?.() || auth.getUsuarioAtual?.() || auth.usuarioAtual?.() || auth.currentUser;
  }

  iniciarEdicao(): void {
    this.novoNome = this.user?.nome || '';
    this.editando = true;
  }

  cancelarEdicao(): void {
    this.editando = false;
  }

  salvarNome(): void {
    if (!this.novoNome.trim() || !this.user) return;

    const nomeAtualizado = this.novoNome.trim();

    this.user.nome = nomeAtualizado;

    localStorage.setItem('fwz_usuario_logado', JSON.stringify(this.user));

    const usuariosSalvos = localStorage.getItem('fwz_usuarios');
    if (usuariosSalvos) {
      const lista = JSON.parse(usuariosSalvos);
      const index = lista.findIndex((u: any) => 
        (u.id && u.id === this.user.id) || (u.email === this.user.email)
      );
      if (index !== -1) {
        lista[index].nome = nomeAtualizado;
        localStorage.setItem('fwz_usuarios', JSON.stringify(lista));
      }
    }

    const auth = this.auth as any;
    if (typeof auth.usuarioAtual?.set === 'function') {
      auth.usuarioAtual.set({ ...this.user });
    } else if (typeof auth.usuario?.set === 'function') {
      auth.usuario.set({ ...this.user });
    }

    this.editando = false;
    this.mensagemSucesso = 'Nome alterado com sucesso!';
    setTimeout(() => this.mensagemSucesso = '', 3000);
  }
}