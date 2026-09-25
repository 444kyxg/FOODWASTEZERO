import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, DecimalPipe } from '@angular/common';
import { Alimento } from '../../../core/models/alimento.model';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [NgIf, DecimalPipe, RouterLink],
  template: `
    <article class="card">
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
          <a [routerLink]="['/alimentos', alimento.id]">Ver lote →</a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .card{background:#fff;border:1px solid #e6ece7;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px #16321a0b;transition:.2s}
    .card:hover{transform:translateY(-4px);box-shadow:0 14px 36px #16321a18}
    .image-wrap{height:190px;position:relative}.image-wrap img{width:100%;height:100%;object-fit:cover}.tag,.urgent{position:absolute;top:12px;padding:6px 9px;border-radius:8px;font-size:10px;font-weight:800;letter-spacing:.05em}.tag{left:12px;background:#fff;color:#267a3e}.tag.donation{color:#9a5a12}.urgent{right:12px;background:#b43d38;color:#fff}
    .body{padding:17px}.body small{color:#718077}.body h3{margin:7px 0 6px;font:700 19px 'Space Grotesk';color:#1b251e}.body p{margin:0;color:#69746c;font-size:13px}.bottom{display:flex;justify-content:space-between;align-items:center;margin-top:17px}.bottom strong{font-size:17px;color:#1f7c3d}.bottom .free{color:#ad6a1d}.bottom a{color:#1e7139;font-weight:700;font-size:13px}
  `]
})
export class FoodCardComponent {
  @Input({ required: true }) alimento!: Alimento;
}