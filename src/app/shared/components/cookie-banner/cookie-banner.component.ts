import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <section class="cookie" *ngIf="visible">
      <div>
        <strong>🍪 Sua privacidade importa</strong>
        <p>Usamos armazenamento local necessário para manter sua sessão e suas preferências. Saiba mais na nossa política.</p>
      </div>
      <div class="actions">
        <a routerLink="/politica-privacidade">Política</a>
        <button (click)="accept()">Entendi</button>
      </div>
    </section>
  `,
  styles: [`
    .cookie { position:fixed; z-index:100; left:20px; right:20px; bottom:20px; max-width:900px; margin:auto; background:#fff; border:1px solid #dce7de; border-radius:18px; box-shadow:0 18px 50px #12201822; padding:18px 20px; display:flex; justify-content:space-between; align-items:center; gap:20px; }
    strong{color:#172018}.cookie p{margin:5px 0 0;color:#667268;font-size:14px;line-height:1.5}.actions{display:flex;align-items:center;gap:15px;white-space:nowrap}.actions a{color:#267c40}.actions button{border:0;background:#217c3d;color:white;border-radius:10px;padding:11px 18px;font-weight:700;cursor:pointer}
    @media(max-width:650px){.cookie{flex-direction:column;align-items:stretch}.actions{justify-content:space-between}}
  `]
})
export class CookieBannerComponent {
  visible = localStorage.getItem('fwz_cookie') !== 'accepted';

  accept(): void {
    localStorage.setItem('fwz_cookie', 'accepted');
    this.visible = false;
  }
}
