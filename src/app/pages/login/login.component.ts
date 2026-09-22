import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="auth-page">
      <div class="auth-visual">
        <span class="eyebrow">BEM-VINDO DE VOLTA</span>
        <h1>Juntos, a gente desperdiça menos.</h1>
        <p>Entre na sua conta para acompanhar doações, lotes e seu impacto.</p>
      </div>
      <form class="auth-card" (ngSubmit)="submit()">
        <h2>Entrar</h2>
        <p class="muted">Use a conta de demonstração ou crie a sua.</p>
        <label>E-mail<input type="email" name="email" [(ngModel)]="email" required></label>
        <label>Senha<input type="password" name="senha" [(ngModel)]="senha" required></label>
        @if (error) { <div class="error">{{ error }}</div> }
        <button class="submit">Entrar</button>
        <div class="demo">Demonstração: <b>teste@email.com</b> · <b>123456</b></div>
        <p class="switch">Ainda não tem conta? <a routerLink="/cadastro">Cadastre-se</a></p>
      </form>
    </section>
  `,
  styles: [`
    .auth-page{min-height:calc(100vh - 76px);display:grid;grid-template-columns:1fr 1fr;background:#f4f8f4}.auth-visual{padding:10vw;background:linear-gradient(140deg,#18341f,#2b7140);color:#fff}.eyebrow{font-size:11px;font-weight:800;letter-spacing:.14em;color:#a5dfaf}.auth-visual h1{font:700 clamp(42px,5vw,66px)/1 'Space Grotesk';margin:18px 0}.auth-visual p{font-size:18px;line-height:1.6;color:#d2e3d5;max-width:480px}.auth-card{align-self:center;justify-self:center;width:min(440px,86%);background:#fff;border-radius:24px;padding:38px;box-shadow:0 20px 60px #17351b12}.auth-card h2{font:700 34px 'Space Grotesk';margin:0}.muted{color:#758078}.auth-card label{display:block;font-size:13px;font-weight:700;margin:19px 0}.auth-card input{display:block;width:100%;box-sizing:border-box;padding:13px 14px;border:1px solid #d8e1da;border-radius:10px;margin-top:7px;font:inherit;outline:none}.auth-card input:focus{border-color:#2c8b49}.submit{width:100%;border:0;background:#247e40;color:#fff;border-radius:11px;padding:14px;font-weight:800;cursor:pointer}.error{background:#fff0ef;color:#a83d39;padding:10px;border-radius:9px;font-size:13px;margin-bottom:14px}.demo{font-size:12px;color:#7b857e;background:#f3f7f3;padding:10px;border-radius:9px;margin-top:12px}.switch{text-align:center;font-size:13px;color:#68736b;margin-bottom:0}.switch a{color:#247b3e;font-weight:700}@media(max-width:800px){.auth-page{grid-template-columns:1fr}.auth-visual{padding:55px 7vw}.auth-visual h1{font-size:45px}.auth-card{margin:40px auto}}
  `]
})
export class LoginComponent {
  email = '';
  senha = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.auth.login(this.email, this.senha)) {
      this.router.navigate(['/painel']);
    } else {
      this.error = 'E-mail ou senha incorretos.';
    }
  }
}
