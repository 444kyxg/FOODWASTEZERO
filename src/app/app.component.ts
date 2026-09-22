import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    CookieBannerComponent,
    NgFor,
    NgClass
  ],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-cookie-banner />

    <div class="toast-container">
      <div 
        *ngFor="let toast of notificationService.toasts()" 
        class="toast" 
        [ngClass]="toast.tipo"
        (click)="notificationService.remove(toast.id)"
      >
        {{ toast.mensagem }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      padding: 12px 20px;
      border-radius: 8px;
      color: #fff;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      cursor: pointer;
      animation: slideIn 0.3s ease;
    }
    .sucesso { background-color: #2e7d32; }
    .erro { background-color: #d32f2f; }
    .aviso { background-color: #ed6c02; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class AppComponent {
  notificationService = inject(NotificationService);
}