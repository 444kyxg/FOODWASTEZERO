import { Component, inject, computed } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AlimentoService } from '../../core/services/alimento.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, RouterLink],
  template: `
    <section class="panel">
      <span class="eyebrow">MEU PAINEL</span>
      <h1>Olá, {{ user()?.nome || 'Usuário' }}</h1>
      <p>Acompanhe sua participação na rede Food Waste Zero.</p>

      <div [ngSwitch]="user()?.tipo" class="cards">
        <ng-container *ngSwitchCase="'ong'">
          <div>
            <span>Solicitações</span>
            <b>{{ totalLotesSolicitados() }}</b>
            <small>lotes solicitados</small>
          </div>
          <div>
            <span>Impacto</span>
            <b>{{ totalKgSalvos() }} kg</b>
            <small>de alimentos salvos</small>
          </div>
          <div>
            <span>Parceiros</span>
            <b>{{ totalParceirosConectados() }}</b>
            <small>estabelecimentos conectados</small>
          </div>
        </ng-container>

        <ng-container *ngSwitchCase="'consumidor'">
          <div>
            <span>Conexões</span>
            <b>{{ totalLotesSolicitados() }}</b>
            <small>lotes resgatados</small>
          </div>
          <div>
            <span>Impacto</span>
            <b>{{ totalKgSalvos() }} kg</b>
            <small>de alimentos salvos</small>
          </div>
          <div>
            <span>Comunidade</span>
            <b>{{ totalLotesSolicitados() > 0 ? 1 : 0 }}</b>
            <small>interações realizadas</small>
          </div>
        </ng-container>

        <ng-container *ngSwitchCase="'estabelecimento'">
          <div>
            <span>Anúncios</span>
            <b>{{ totalLotesAnunciados() }}</b>
            <small>lotes ativos</small>
          </div>
          <div>
            <span>Doações</span>
            <b>{{ totalKgSalvos() }} kg</b>
            <small>doados para ONGs</small>
          </div>
          <div>
            <span>Economia</span>
            <b>R$ {{ totalEconomiaEvitada() }}</b>
            <small>evitados em descarte</small>
          </div>
        </ng-container>

        <ng-container *ngSwitchDefault>
          <div>
            <span>Solicitações</span>
            <b>{{ totalLotesSolicitados() }}</b>
            <small>lotes solicitados</small>
          </div>
          <div>
            <span>Impacto</span>
            <b>{{ totalKgSalvos() }} kg</b>
            <small>de alimentos salvos</small>
          </div>
          <div>
            <span>Parceiros</span>
            <b>{{ totalParceirosConectados() }}</b>
            <small>estabelecimentos conectados</small>
          </div>
        </ng-container>
      </div>

      <div class="actions">
        <a routerLink="/alimentos">Encontrar alimentos →</a>
        <a routerLink="/comunidade">Ir para comunidade →</a>
        <a routerLink="/perfil">Meu perfil →</a>
      </div>
    </section>
  `,
  styles: [`
    .panel {
      padding: 80px 7vw;
      min-height: 60vh;
      background: #f2f7f2;
    }
    .eyebrow {
      font-size: 11px;
      letter-spacing: .14em;
      color: #2e8247;
      font-weight: 800;
    }
    .panel h1 {
      font: 700 clamp(42px, 6vw, 68px) 'Space Grotesk', sans-serif;
      margin: 15px 0 8px;
    }
    .panel > p {
      color: #69746c;
      font-size: 18px;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 45px 0;
    }
    .cards div {
      background: #fff;
      padding: 25px;
      border: 1px solid #e0e9e1;
      border-radius: 18px;
    }
    .cards span, .cards small {
      display: block;
      color: #778279;
    }
    .cards b {
      display: block;
      font: 700 34px 'Space Grotesk', sans-serif;
      color: #237b3d;
      margin: 8px 0;
    }
    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .actions a {
      background: #fff;
      border: 1px solid #dce5dd;
      padding: 14px 17px;
      border-radius: 11px;
      color: #247b3e;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .actions a:hover {
      background: #e8f3e9;
      border-color: #247b3e;
    }
    @media (max-width: 700px) {
      .cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PainelComponent {
  private auth = inject(AuthService);
  private alimentoService = inject(AlimentoService);

  user = this.auth.usuario;
  alimentos = this.alimentoService.alimentos;

  meusLotesResgatados = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return [];
    
    const uId = String(usuarioAtual.id);
    return (this.alimentos() || []).filter((item: any) => {
      const interessado = item.interessadoId ?? item.interessadoUsuarioId;
      return item.temInteressado && String(interessado) === uId;
    });
  });

  meusLotesDoados = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return [];

    return (this.alimentos() || []).filter((item: any) => {
      const pertenceAoEstabelecimento = 
        item.estabelecimento === usuarioAtual.nome || 
        String(item.estabelecimentoId) === String(usuarioAtual.id);

      return pertenceAoEstabelecimento && item.temInteressado;
    });
  });

  totalLotesSolicitados = computed(() => this.meusLotesResgatados().length);

  totalKgSalvos = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return 0;

    const listaParaCalcular = usuarioAtual.tipo === 'estabelecimento' 
      ? this.meusLotesDoados() 
      : this.meusLotesResgatados();

    return listaParaCalcular.reduce((acc: number, item: any) => {
      const qtd = parseFloat(item.quantidade) || 0;
      return acc + qtd;
    }, 0);
  });

  totalParceirosConectados = computed(() => {
    const estabelecimentos = this.meusLotesResgatados().map((item: any) => item.estabelecimento).filter(Boolean);
    return new Set(estabelecimentos).size;
  });

  totalLotesAnunciados = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return 0;

    return (this.alimentos() || []).filter((item: any) => {
      return item.estabelecimento === usuarioAtual.nome || 
            String(item.estabelecimentoId) === String(usuarioAtual.id);
    }).length;
  });

  totalEconomiaEvitada = computed(() => this.totalKgSalvos() * 8);
}