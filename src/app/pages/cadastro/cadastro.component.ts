import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="auth-page">
      <div class="auth-visual">
        <span class="eyebrow">FAÇA PARTE DA REDE</span>
        <h1>Seu cadastro pode começar uma conexão.</h1>
        <p>Escolha como você quer participar do combate ao desperdício em Salvador.</p>
      </div>
      <form class="auth-card" (ngSubmit)="submit()">
        <h2>Criar conta</h2>
        <p class="muted">Leva menos de um minuto.</p>

        <label>Nome ou organização
          <input name="nome" [(ngModel)]="nome" required>
        </label>

        <label>E-mail
          <input type="email" name="email" [(ngModel)]="email" required>
        </label>

        <label>Tipo de conta
          <select name="tipo" [(ngModel)]="tipo">
            <option value="consumidor">Consumidor</option>
            <option value="estabelecimento">Estabelecimento</option>
            <option value="ong">ONG</option>
          </select>
        </label>

        <label>Senha
          <input type="password" name="senha" [(ngModel)]="senha" minlength="6" required>
        </label>

        <label class="check">
          <input type="checkbox" name="lgpd" [(ngModel)]="lgpd">
          <span>Li e concordo com a <a routerLink="/politica-privacidade">Política de Privacidade</a>.</span>
        </label>

        @if (error) { <div class="error">{{ error }}</div> }

        <button class="submit">Criar conta</button>
        <p class="switch">Já possui conta? <a routerLink="/login">Entrar</a></p>
      </form>
    </section>
  `,
  styles: [`
    .auth-page{min-height:calc(100vh - 76px);display:grid;grid-template-columns:1fr 1fr;background:#f4f8f4}.auth-visual{padding:10vw;background:linear-gradient(140deg,#18341f,#2b7140);color:#fff}.eyebrow{font-size:11px;font-weight:800;letter-spacing:.14em;color:#a5dfaf}.auth-visual h1{font:700 clamp(42px,5vw,66px)/1 'Space Grotesk';margin:18px 0}.auth-visual p{font-size:18px;line-height:1.6;color:#d2e3d5;max-width:480px}.auth-card{align-self:center;justify-self:center;width:min(460px,86%);background:#fff;border-radius:24px;padding:34px 38px;box-shadow:0 20px 60px #17351b12}.auth-card h2{font:700 34px 'Space Grotesk';margin:0}.muted{color:#758078}.auth-card label{display:block;font-size:13px;font-weight:700;margin:14px 0}.auth-card input:not([type=checkbox]),select{display:block;width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #d8e1da;border-radius:10px;margin-top:7px;font:inherit;background:#fff}.check{display:flex!important;gap:8px;align-items:flex-start;font-weight:400!important}.check input{margin-top:2px}.check a{color:#247b3e}.submit{width:100%;border:0;background:#247e40;color:#fff;border-radius:11px;padding:14px;font-weight:800;cursor:pointer}.error{background:#fff0ef;color:#a83d39;padding:10px;border-radius:9px;font-size:13px;margin-bottom:14px}.switch{text-align:center;font-size:13px;color:#68736b}.switch a{color:#247b3e;font-weight:700}@media(max-width:800px){.auth-page{grid-template-columns:1fr}.auth-visual{padding:55px 7vw}.auth-visual h1{font-size:45px}.auth-card{margin:40px auto}}
  `]
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  tipo: 'consumidor' | 'estabelecimento' | 'ong' = 'consumidor';
  lgpd = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.lgpd) {
      this.error = 'Você precisa aceitar a Política de Privacidade.';
      return;
    }

    if (this.senha.length < 6) {
      this.error = 'A senha precisa ter pelo menos 6 caracteres.';
      return;
    }

    const created = this.auth.cadastrar({
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: this.tipo
    });

    if (!created) {
      this.error = 'Este e-mail já está cadastrado.';
      return;
    }

    this.router.navigate(['/painel']);
  }
}
