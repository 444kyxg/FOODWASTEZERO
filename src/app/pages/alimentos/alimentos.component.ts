import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alimento } from '../../core/models/alimento.model';
import { AlimentoService } from '../../core/services/alimento.service';
import { FoodCardComponent } from '../../shared/components/food-card/food-card.component';

@Component({
  selector: 'app-alimentos',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, FoodCardComponent],
  template: `
    <section class="page-head">
      <span>RESGATE ALIMENTOS EM SALVADOR</span>
      <h1>O que pode ser salvo hoje?</h1>
      <p>Encontre lotes com desconto ou disponíveis para doação perto de você.</p>
    </section>

    <section class="listing">
      <div class="filters">
        <input [(ngModel)]="search" placeholder="Buscar alimento ou estabelecimento...">
        <select [(ngModel)]="type">
          <option value="todos">Todos</option>
          <option value="desconto">Desconto</option>
          <option value="doacao">Doação</option>
        </select>
        <select [(ngModel)]="category">
          <option value="todas">Todas as categorias</option>
          <option value="Frutas">Frutas</option>
          <option value="Padaria">Padaria</option>
          <option value="Legumes">Legumes</option>
          <option value="Laticínios">Laticínios</option>
          <option value="Mercearia">Mercearia</option>
        </select>
      </div>

      <div class="grid">
        <app-food-card *ngFor="let alimento of filtered" [alimento]="alimento" />
      </div>

      <div class="empty" *ngIf="filtered.length === 0">
        Nenhum lote encontrado com esses filtros.
      </div>
    </section>
  `,
  styles: [`
    .page-head {
      padding: 75px 7vw 60px;
      background: #eff7ef;
    }
    .page-head span {
      font-size: 11px;
      letter-spacing: .14em;
      font-weight: 800;
      color: #2f8448;
    }
    .page-head h1 {
      font: 700 clamp(42px, 6vw, 68px) 'Space Grotesk', sans-serif;
      letter-spacing: -.04em;
      margin: 16px 0 10px;
      color: #172119;
    }
    .page-head p {
      color: #68736b;
      font-size: 18px;
    }
    .listing {
      padding: 55px 7vw 90px;
      max-width: 1300px;
      margin: auto;
    }
    .filters {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 30px;
    }
    .filters input, .filters select {
      padding: 14px;
      border: 1px solid #dbe4dc;
      border-radius: 11px;
      background: #fff;
      font: inherit;
      color: #455148;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .empty {
      text-align: center;
      padding: 60px;
      color: #748077;
    }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr 1fr; }
      .filters { grid-template-columns: 1fr 1fr; }
      .filters input { grid-column: 1 / -1; }
    }
    @media (max-width: 600px) {
      .page-head { padding: 50px 6vw; }
      .listing { padding: 40px 6vw; }
      .grid { grid-template-columns: 1fr; }
      .filters { grid-template-columns: 1fr; }
    }
  `]
})
export class AlimentosComponent {
  search = '';
  type = 'todos';
  category = 'todas';

  constructor(private service: AlimentoService) {}

  // Lê diretamente o array retornado pelo serviço
  get alimentos(): Alimento[] {
    const dados = this.service.getAlimentos();
    return Array.isArray(dados) ? dados : [];
  }

  get filtered(): Alimento[] {
    const term = this.search.toLowerCase().trim();

    return this.alimentos.filter(item => {
      const matchesSearch = !term || `${item.nome} ${item.estabelecimento} ${item.bairro}`.toLowerCase().includes(term);
      const matchesType = this.type === 'todos' || item.tipo === this.type;
      const matchesCategory = this.category === 'todas' || item.categoria === this.category;
      return matchesSearch && matchesType && matchesCategory;
    });
  }
}