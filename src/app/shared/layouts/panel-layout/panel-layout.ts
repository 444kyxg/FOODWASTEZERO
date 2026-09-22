import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

export interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-panel-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor],
  template: `
    <div class="panel-layout">
      <aside class="sidebar">
        <h2>{{ tituloPainel }}</h2>
        <nav>
          <ul>
            <li *ngFor="let item of menu">
              <a [routerLink]="item.link">{{ item.label }}</a>
            </li>
          </ul>
        </nav>
        <button class="btn-logout" (click)="authService.logout()">Sair</button>
      </aside>

      <main class="panel-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .panel-layout {
      display: flex;
      min-height: calc(100vh - 80px);
    }
    .sidebar {
      width: 260px;
      background-color: #1e293b;
      color: #ffffff;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
    }
    .sidebar h2 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid #334155;
    }
    .sidebar nav {
      flex: 1;
    }
    .sidebar ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar li {
      margin-bottom: 8px;
    }
    .sidebar a {
      display: block;
      padding: 10px 12px;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: background 0.2s, color 0.2s;
    }
    .sidebar a:hover {
      background-color: #334155;
      color: #ffffff;
    }
    .panel-content {
      flex: 1;
      padding: 32px;
      background-color: #f8fafc;
    }
    .btn-logout {
      margin-top: auto;
      background-color: #dc2626;
      color: #ffffff;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
    }
  `]
})
export class PanelLayoutComponent {
  @Input() tituloPainel = 'Painel';
  @Input() menu: MenuItem[] = [];

  authService = inject(AuthService);
}