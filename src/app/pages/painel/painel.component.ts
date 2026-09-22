import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="panel">
      <span class="eyebrow">MEU PAINEL</span>
      <h1>Olá, {{ user?.nome }}</h1>
      <p>Acompanhe sua participação na rede Food Waste Zero.</p>

      <div class="cards">
        <div><span>Conexões</span><b>12</b><small>lotes resgatados</small></div>
        <div><span>Impacto</span><b>38 kg</b><small>de alimentos salvos</small></div>
        <div><span>Comunidade</span><b>7</b><small>interações realizadas</small></div>
      </div>

      <div class="actions">
        <a routerLink="/alimentos">Encontrar alimentos →</a>
        <a routerLink="/comunidade">Ir para comunidade →</a>
        <a routerLink="/perfil">Meu perfil →</a>
      </div>
    </section>
  `,
  styles: [`
    .panel{padding:80px 7vw;min-height:60vh;background:#f2f7f2}.eyebrow{font-size:11px;letter-spacing:.14em;color:#2e8247;font-weight:800}.panel h1{font:700 clamp(42px,6vw,68px) 'Space Grotesk';margin:15px 0 8px}.panel>p{color:#69746c;font-size:18px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:45px 0}.cards div{background:#fff;padding:25px;border:1px solid #e0e9e1;border-radius:18px}.cards span,.cards small{display:block;color:#778279}.cards b{display:block;font:700 34px 'Space Grotesk';color:#237b3d;margin:8px 0}.actions{display:flex;gap:12px;flex-wrap:wrap}.actions a{background:#fff;border:1px solid #dce5dd;padding:14px 17px;border-radius:11px;color:#247b3e;font-weight:700}@media(max-width:700px){.cards{grid-template-columns:1fr}}
  `]
})
export class PainelComponent {
  user = this.auth.getCurrentUser();
  constructor(private auth: AuthService) {}
}
