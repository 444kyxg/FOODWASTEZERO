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
        
        <div class="avatar-container">
          <img 
            *ngIf="user?.foto || user?.imagem; else avatarTexto" 
            [src]="user.foto || user.imagem" 
            alt="Foto de perfil" 
            class="avatar-img"
          >
          <ng-template #avatarTexto>
            <div class="avatar">{{ (user?.nome?.[0] || 'U') | uppercase }}</div>
          </ng-template>

          <label class="btn-foto" title="Alterar foto de perfil">
            📷
            <input type="file" (change)="onFotoSelecionada($event)" accept="image/*" hidden>
          </label>
        </div>

        <div *ngIf="editando; else modoVisualizacao" class="edit-box">
          <label for="nome-input">Nome ou Organização</label>
          <input 
            id="nome-input"
            type="text" 
            [(ngModel)]="novoNome" 
            placeholder="Digite o novo nome"
            class="input-field">

          <label for="desc-input">Descrição</label>
          <textarea 
            id="desc-input"
            [(ngModel)]="novaDescricao" 
            placeholder="Conte um pouco sobre sua organização..."
            rows="3"
            class="input-field textarea"></textarea>

          <div class="field-row">
            <div>
              <label for="bairro-input">Bairro</label>
              <input id="bairro-input" type="text" [(ngModel)]="novoBairro" placeholder="Ex: Pituba" class="input-field">
            </div>
            <div>
              <label for="cidade-input">Cidade</label>
              <input id="cidade-input" type="text" [(ngModel)]="novaCidade" placeholder="Ex: Salvador" class="input-field">
            </div>
          </div>

          <div class="actions-btn">
            <button class="btn-salvar" (click)="salvarPerfil()">Salvar</button>
            <button class="btn-cancelar" (click)="cancelarEdicao()">Cancelar</button>
          </div>
        </div>

        <ng-template #modoVisualizacao>
          <h1>{{ user?.nome }}</h1>
          <p class="descricao-texto">{{ user?.descricao || 'Nenhuma descrição informada.' }}</p>

          <p class="localizacao" *ngIf="user?.bairro || user?.cidade">
            {{ user?.bairro ? user.bairro + ', ' : '' }}{{ user?.cidade || 'Salvador' }}
          </p>

          <button class="btn-editar" (click)="iniciarEdicao()">Alterar perfil</button>
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
    
    .avatar-container{position:relative;width:90px;height:90px;margin:0 auto 15px}
    .avatar-img{width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid #247b3e}
    .avatar{width:90px;height:90px;border-radius:50%;background:#dcefdc;color:#247b3e;display:grid;place-items:center;font:700 36px 'Space Grotesk'}
    
    .btn-foto{
      position:absolute;bottom:0;right:-4px;background:#247b3e;color:#fff;
      width:32px;height:32px;border-radius:50%;display:flex;align-items:center;
      justify-content:center;cursor:pointer;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.15);
      font-size:14px;
    }

    .profile-card h1{font:700 32px 'Space Grotesk';margin:15px 0 5px}
    .descricao-texto{color:#556057;font-size:14px;line-height:1.5;margin:5px 0 10px}
    .localizacao{font-size:13px;font-weight:700;color:#2e8247;margin-bottom:15px}
    .email{color:#758078;margin-bottom:12px;font-size:14px}
    .type{display:inline-block;background:#edf6ee;color:#247b3e;border-radius:20px;padding:8px 13px;font-size:12px;font-weight:800;text-transform:capitalize}
    
    .btn-editar{background:none;border:none;color:#247b3e;font-weight:700;font-size:13px;cursor:pointer;margin-bottom:10px;text-decoration:underline;display:block;margin:10px auto}
    
    .edit-box{margin:18px 0;text-align:left}
    .edit-box label{display:block;font-size:12px;font-weight:700;color:#556057;margin-bottom:6px}
    .input-field{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #c8d6c9;border-radius:10px;font:inherit;font-weight:600;margin-bottom:12px}
    .textarea{resize:vertical;font-weight:400}
    .field-row{display:flex;gap:10px}.field-row div{flex:1}
    
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
  novaDescricao = '';
  novoBairro = '';
  novaCidade = '';
  mensagemSucesso = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    const auth = this.auth as any;
    this.user = auth.getCurrentUser?.() || auth.getUsuarioAtual?.() || auth.usuarioAtual?.() || auth.currentUser;
  }

  onFotoSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const fotoBase64 = reader.result as string;
        this.user.foto = fotoBase64;
        this.user.imagem = fotoBase64;
        this.persistirDadosUsuario();
        this.exibirSucesso('Foto de perfil alterada com sucesso!');
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  iniciarEdicao(): void {
    this.novoNome = this.user?.nome || '';
    this.novaDescricao = this.user?.descricao || '';
    this.novoBairro = this.user?.bairro || '';
    this.novaCidade = this.user?.cidade || '';
    this.editando = true;
  }

  cancelarEdicao(): void {
    this.editando = false;
  }

  salvarPerfil(): void {
    if (!this.novoNome.trim() || !this.user) return;

    this.user.nome = this.novoNome.trim();
    this.user.descricao = this.novaDescricao.trim();
    
    if (this.user.tipo === 'ong') {
      this.user.causa = this.novaDescricao.trim();
    }
    
    this.user.bairro = this.novoBairro.trim();
    this.user.cidade = this.novaCidade.trim();
    this.editando = false;

    this.persistirDadosUsuario();
    this.exibirSucesso('Perfil atualizado com sucesso!');
  }

  private persistirDadosUsuario(): void {
    localStorage.setItem('fwz_usuario', JSON.stringify(this.user));
    localStorage.setItem('fwz_usuario_logado', JSON.stringify(this.user));

    const usuariosSalvos = localStorage.getItem('fwz_usuarios');
    if (usuariosSalvos) {
      const lista = JSON.parse(usuariosSalvos);
      const index = lista.findIndex((u: any) => 
        (u.id && u.id === this.user.id) || (u.email === this.user.email)
      );
      if (index !== -1) {
        lista[index] = { ...lista[index], ...this.user };
        localStorage.setItem('fwz_usuarios', JSON.stringify(lista));
      }
    }

    const auth = this.auth as any;
    if (typeof auth.usuario?.set === 'function') {
      auth.usuario.set({ ...this.user });
    }

    window.dispatchEvent(new Event('storage'));
  }

  private exibirSucesso(msg: string): void {
    this.mensagemSucesso = msg;
    setTimeout(() => this.mensagemSucesso = '', 3000);
  }
}