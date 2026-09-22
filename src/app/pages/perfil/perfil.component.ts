import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  template: `
    <section class="profile">
      <span>MINHA CONTA</span>
      <div class="profile-card">
        <div class="avatar">{{ user?.nome?.[0] }}</div>
        <h1>{{ user?.nome }}</h1>
        <p>{{ user?.email }}</p>
        <div class="type">{{ user?.tipo }}</div>
        <p class="note">Dados simulados localmente para o projeto acadêmico.</p>
      </div>
    </section>
  `,
  styles: [`
    .profile{padding:80px 7vw;min-height:60vh;background:#f2f7f2}.profile>span{font-size:11px;font-weight:800;letter-spacing:.14em;color:#2e8247}.profile-card{background:#fff;max-width:600px;margin:25px 0;padding:35px;border-radius:22px;border:1px solid #e1e9e2;text-align:center}.avatar{width:80px;height:80px;margin:auto;border-radius:50%;background:#dcefdc;color:#247b3e;display:grid;place-items:center;font:700 32px 'Space Grotesk'}.profile-card h1{font:700 32px 'Space Grotesk';margin:15px 0 5px}.profile-card p{color:#758078}.type{display:inline-block;background:#edf6ee;color:#247b3e;border-radius:20px;padding:8px 13px;font-size:12px;font-weight:800;text-transform:capitalize}.note{font-size:12px;margin-top:25px}
  `]
})
export class PerfilComponent {
  user = this.auth.getCurrentUser();
  constructor(private auth: AuthService) {}
}
