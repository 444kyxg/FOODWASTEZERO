import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, DecimalPipe } from '@angular/common';
import { Alimento } from '../../../core/models/alimento.model';
import { AlimentoService } from '../../../core/services/alimento.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [NgIf, DecimalPipe, RouterLink],
  template: `
    <article class="card" (click)="irParaDetalhes()">
      <div class="image-wrap">
        <img [src]="alimento.imagem" [alt]="alimento.nome">
        <span [class.donation]="alimento.tipo === 'doacao'" class="tag">
          {{ alimento.tipo === 'doacao' ? 'DOAÇÃO' : 'DESCONTO' }}
        </span>
        @if (alimento.urgente) { <span class="urgent">URGENTE</span> }
      </div>
      <div class="body">
        <small>{{ alimento.categoria }} · {{ alimento.bairro }}</small>
        <h3>{{ alimento.nome }}</h3>
        <p>{{ alimento.quantidade }} {{ alimento.unidade }} · {{ alimento.estabelecimento }}</p>
        <div class="bottom">
          <strong *ngIf="alimento.preco; else free">R$ {{ alimento.preco | number:'1.2-2' }}</strong>
          <ng-template #free><strong class="free">Gratuito</strong></ng-template>
          
          <div class="actions">
            <button 
              *ngIf="podeExcluir" 
              (click)="excluirLote($event)" 
              class="btn-delete" 
              title="Excluir este lote">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Excluir
            </button>
            
            <a [routerLink]="['/alimentos', alimento.id]" (click)="$event.stopPropagation()">Ver lote →</a>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .card {
      background: #fff;
      border: 1px solid #e6ece7;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px #16321a0b;
      transition: .2s;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 36px #16321a18;
    }
    .image-wrap { height: 190px; position: relative; }
    .image-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .tag, .urgent {
      position: absolute;
      top: 12px;
      padding: 6px 9px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: .05em;
    }
    .tag { left: 12px; background: #fff; color: #267a3e; }
    .tag.donation { color: #9a5a12; }
    .urgent { right: 12px; background: #b43d38; color: #fff; }
    .body { padding: 17px; }
    .body small { color: #718077; }
    .body h3 { margin: 7px 0 6px; font: 700 19px 'Space Grotesk'; color: #1b251e; }
    .body p { margin: 0; color: #69746c; font-size: 13px; }
    .bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 17px; }
    .bottom strong { font-size: 17px; color: #1f7c3d; }
    .bottom .free { color: #ad6a1d; }
    .actions { display: flex; align-items: center; gap: 10px; }
    .actions a { color: #1e7139; font-weight: 700; font-size: 13px; text-decoration: none; }
    
    .btn-delete {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
    }
    .btn-delete:hover {
      background: #dc2626;
      color: #ffffff;
      border-color: #dc2626;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
    }
    .btn-delete:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `]
})
export class FoodCardComponent {
  @Input({ required: true }) alimento!: Alimento;

  constructor(
    private alimentoService: AlimentoService,
    private authService: AuthService,
    private router: Router
  ) {}

  get podeExcluir(): boolean {
    const auth = this.authService as any;
    const user = auth.getCurrentUser?.() || auth.getUsuarioAtual?.() || auth.usuarioAtual?.() || auth.currentUser;

    if (!user || user.tipo !== 'estabelecimento') {
      return false;
    }

    return this.alimento.estabelecimento === user.nome || (this.alimento as any).usuarioId === user.id;
  }

  irParaDetalhes(): void {
    this.router.navigate(['/alimentos', this.alimento.id]);
  }

  excluirLote(event: Event): void {
    event.stopPropagation();

    if (confirm(`Deseja realmente excluir o lote "${this.alimento.nome}"?`)) {
      const service = this.alimentoService as any;
      const metodoExcluir = service.excluirAlimento || service.excluir || service.remover;

      if (typeof metodoExcluir === 'function') {
        metodoExcluir.call(service, this.alimento.id);
        window.location.reload();
      }
    }
  }
}