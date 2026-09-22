import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Ong } from '../../core/models/ong.model';
import { OngService } from '../../core/services/ong.service';
import { OngCardComponent } from '../../shared/components/ong-card/ong-card.component';

@Component({
  selector: 'app-ongs',
  standalone: true,
  imports: [NgFor, OngCardComponent],
  template: `
    <section class="head"><span>REDE DE APOIO</span><h1>Quem transforma excedente em impacto.</h1><p>Conheça organizações parceiras e veja como a comunidade pode apoiar.</p></section>
    <section class="content">
      <div class="grid"><app-ong-card *ngFor="let ong of ongs" [ong]="ong" /></div>
      <div class="impact-note"><b>Transparência importa.</b> Nesta versão acadêmica, os números de impacto são dados simulados. Em uma versão real, as ONGs poderiam publicar prestações de contas e atualizações verificáveis.</div>
    </section>
  `,
  styles: [`
    .head{padding:75px 7vw;background:#eff7ef}.head span{font-size:11px;font-weight:800;letter-spacing:.14em;color:#2f8448}.head h1{font:700 clamp(42px,6vw,68px)/1.03 'Space Grotesk';max-width:850px;margin:16px 0}.head p{font-size:18px;color:#68736b}.content{padding:60px 7vw 90px;max-width:1300px;margin:auto}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.impact-note{margin-top:35px;padding:20px;background:#f3f6f3;border-radius:14px;color:#68736b;font-size:14px;line-height:1.6}.impact-note b{color:#253229}@media(max-width:850px){.grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){.head{padding:50px 6vw}.content{padding:40px 6vw}.grid{grid-template-columns:1fr}}
  `]
})
export class OngsComponent implements OnInit {
  ongs: Ong[] = [];
  constructor(private service: OngService) {}
  ngOnInit(): void { this.service.getOngs().subscribe(data => this.ongs = data); }
}
