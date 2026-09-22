import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="footer-main">
        <div>
          <div class="footer-brand">Food Waste <b>Zero</b></div>
          <p>Conectando alimentos, pessoas e impacto em Salvador.</p>
        </div>
        <div>
          <h4>Plataforma</h4>
          <a routerLink="/alimentos">Encontrar alimentos</a>
          <a routerLink="/ongs">ONGs parceiras</a>
          <a routerLink="/comunidade">Comunidade</a>
        </div>
        <div>
          <h4>Privacidade</h4>
          <a routerLink="/politica-privacidade">Política de Privacidade</a>
        </div>
      </div>
      <div class="copyright">© 2026 Food Waste Zero · Projeto acadêmico TCC Front-End</div>
    </footer>
  `,
  styles: [`
    footer { background:#142018; color:#dbe7dd; padding:55px 6vw 22px; }
    .footer-main { display:grid; grid-template-columns:2fr 1fr 1fr; gap:40px; max-width:1200px; margin:auto; }
    .footer-brand { font:700 25px 'Space Grotesk'; color:#fff; }
    .footer-brand b { color:#6fca8a; }
    footer p { color:#a9b8ac; max-width:340px; line-height:1.7; }
    h4 { color:#fff; margin:0 0 15px; }
    footer a { display:block; color:#a9b8ac; margin:9px 0; }
    footer a:hover { color:#fff; }
    .copyright { max-width:1200px; margin:45px auto 0; padding-top:18px; border-top:1px solid #2a382d; color:#819083; font-size:13px; }
    @media(max-width:700px){ .footer-main{grid-template-columns:1fr;} }
  `]
})
export class FooterComponent {}
