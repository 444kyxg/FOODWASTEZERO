import { Component, Input } from '@angular/core';
import { Ong } from '../../../core/models/ong.model';

@Component({
  selector: 'app-ong-card',
  standalone: true,
  imports: [],
  template: `
    <article class="ong-card">
      <img [src]="ong.imagem || 'assets/images/default-ong.jpg'" [alt]="ong.nome">
      <div>
        <span>ONG parceira</span>
        <h3>{{ ong.nome }}</h3>
        <p>{{ ong.descricao }}</p>
        <small>{{ ong.bairro || 'Salvador' }}, {{ ong.cidade || 'Salvador' }}</small>
      </div>
    </article>
  `,
  styles: [`
    .ong-card{background:#fff;border:1px solid #e6ece7;border-radius:18px;overflow:hidden}.ong-card img{width:100%;height:170px;object-fit:cover}.ong-card div{padding:18px}.ong-card span{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#2d8a4b;font-weight:800}.ong-card h3{font:700 19px 'Space Grotesk';margin:7px 0}.ong-card p{color:#69746c;font-size:14px;line-height:1.55}.ong-card small{color:#7b857d;font-weight:600;display:block;margin-top:10px}
  `]
})
export class OngCardComponent {
  @Input({ required: true }) ong!: Ong;
}