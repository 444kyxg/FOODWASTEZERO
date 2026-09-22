import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Alimento } from '../../core/models/alimento.model';
import { AlimentoService } from '../../core/services/alimento.service';

@Component({
  selector: 'app-alimento-detalhes',
  standalone: true,
  imports: [NgIf, DecimalPipe, RouterLink],
  template: `
    <section class="details" *ngIf="alimento as item">
      <img [src]="item.imagem" [alt]="item.nome">
      <div class="content">
        <span class="tag">{{ item.tipo === 'doacao' ? 'DOAÇÃO GRATUITA' : 'DESCONTO' }}</span>
        <h1>{{ item.nome }}</h1>
        <p class="intro">Este lote está disponível para resgate em Salvador.</p>
        <div class="facts">
          <div><small>Quantidade</small><b>{{ item.quantidade }} {{ item.unidade }}</b></div>
          <div><small>Validade</small><b>{{ item.validade }}</b></div>
          <div><small>Local</small><b>{{ item.bairro }}</b></div>
          <div><small>Estabelecimento</small><b>{{ item.estabelecimento }}</b></div>
        </div>
        <div class="price" *ngIf="item.preco; else donation">R$ {{ item.preco | number:'1.2-2' }}</div>
        <ng-template #donation><div class="price free">Gratuito</div></ng-template>
        <button class="reserve">Tenho interesse</button>
        <p class="note">Demonstração acadêmica: o botão não realiza uma reserva real.</p>
        <a routerLink="/alimentos">← Voltar para alimentos</a>
      </div>
    </section>

    <section class="not-found" *ngIf="!alimento">
      <h2>Lote não encontrado.</h2><a routerLink="/alimentos">Ver alimentos</a>
    </section>
  `,
  styles: [`
    .details{max-width:1150px;margin:70px auto;padding:0 30px;display:grid;grid-template-columns:1fr 1fr;gap:55px;align-items:center}.details>img{width:100%;height:540px;object-fit:cover;border-radius:28px}.tag{font-size:11px;font-weight:800;letter-spacing:.12em;color:#2b8447}.content h1{font:700 55px/1 'Space Grotesk';color:#18221a;margin:14px 0}.intro{color:#68746c;font-size:18px;line-height:1.6}.facts{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:28px 0}.facts div{background:#f1f6f1;border-radius:12px;padding:15px}.facts small,.facts b{display:block}.facts small{color:#7b867e;font-size:12px}.facts b{margin-top:5px;color:#2a352c}.price{font:700 28px 'Space Grotesk';color:#227b3d}.price.free{color:#a86a1e}.reserve{width:100%;margin:22px 0 7px;padding:15px;border:0;border-radius:12px;background:#247e40;color:#fff;font-weight:800;font-size:15px}.note{font-size:11px;color:#879087}.content>a{display:inline-block;margin-top:18px;color:#247b3e;font-weight:700}.not-found{text-align:center;padding:100px}.not-found a{color:#247b3e}@media(max-width:800px){.details{grid-template-columns:1fr;margin:35px auto}.details>img{height:330px}.content h1{font-size:43px}}
  `]
})
export class AlimentoDetalhesComponent implements OnInit {
  alimento?: Alimento;

  constructor(private route: ActivatedRoute, private service: AlimentoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getAlimentoById(id).subscribe(data => this.alimento = data);
  }
}
