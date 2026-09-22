import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-comunidade',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="head"><span>COMUNIDADE FOOD WASTE ZERO</span><h1>Histórias que mostram o impacto.</h1><p>Um espaço para ONGs e participantes compartilharem atualizações, resultados e iniciativas.</p></section>
    <section class="feed">
      <article class="post" *ngFor="let post of posts">
        <div class="post-top"><div class="avatar">{{ post.autor[0] }}</div><div><b>{{ post.autor }}</b><small>{{ post.tipo }} · {{ post.tempo }}</small></div></div>
        <h2>{{ post.titulo }}</h2><p>{{ post.texto }}</p>
        <div class="post-image" [style.background-image]="'url(' + post.imagem + ')'"></div>
        <div class="interactions">♡ {{ post.curtidas }} curtidas <span>💬 {{ post.comentarios }} comentários</span></div>
      </article>
    </section>
  `,
  styles: [`
    .head{padding:75px 7vw;background:#eff7ef}.head span{font-size:11px;font-weight:800;letter-spacing:.14em;color:#2f8448}.head h1{font:700 clamp(42px,6vw,68px)/1.03 'Space Grotesk';max-width:850px;margin:16px 0}.head p{font-size:18px;color:#68736b;max-width:700px}.feed{max-width:760px;margin:auto;padding:55px 20px 90px}.post{background:#fff;border:1px solid #e4ebe5;border-radius:20px;padding:22px;margin-bottom:20px}.post-top{display:flex;gap:12px;align-items:center}.avatar{width:42px;height:42px;border-radius:50%;background:#dcefdc;color:#26783d;display:grid;place-items:center;font-weight:800}.post-top b,.post-top small{display:block}.post-top small{color:#818b83;font-size:12px;margin-top:3px}.post h2{font:700 22px 'Space Grotesk';margin:22px 0 7px}.post p{color:#667168;line-height:1.65}.post-image{height:290px;background-size:cover;background-position:center;border-radius:14px;margin-top:18px}.interactions{padding-top:15px;color:#536158;font-size:13px}.interactions span{margin-left:20px}@media(max-width:600px){.head{padding:50px 6vw}.feed{padding:35px 12px}.post-image{height:230px}}
  `]
})
export class ComunidadeComponent {
  posts = [
    { autor:'Instituto Mesa Solidária', tipo:'ONG parceira', tempo:'há 2h', titulo:'Mais 120 refeições chegaram às famílias do bairro.', texto:'Hoje transformamos lotes recebidos pela rede em refeições prontas para distribuição. Obrigado a cada estabelecimento e voluntário que fez parte dessa conexão.', imagem:'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1000&q=80', curtidas:42, comentarios:8 },
    { autor:'Padaria da Cidade', tipo:'Estabelecimento', tempo:'ontem', titulo:'Nosso primeiro lote de doação!', texto:'Em vez de descartar pães no fim do dia, decidimos disponibilizar o excedente para a rede. Queremos repetir essa iniciativa.', imagem:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80', curtidas:31, comentarios:5 }
  ];
}
