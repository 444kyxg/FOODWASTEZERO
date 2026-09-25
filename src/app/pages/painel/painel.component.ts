import { Component, inject, computed } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AlimentoService } from '../../core/services/alimento.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, UpperCasePipe, RouterLink],
  template: `
    <section class="panel">
      <span class="eyebrow">MEU PAINEL</span>

      <div class="user-header" *ngIf="userData as u">
        <div class="avatar-box">
          <img 
            *ngIf="u?.foto || u?.imagem; else avatarTexto" 
            [src]="u?.foto || u?.imagem" 
            alt="Foto do perfil" 
            class="avatar-img"
          >
          <ng-template #avatarTexto>
            <div class="avatar-fallback">
              {{ (u?.nome?.[0] || 'U') | uppercase }}
            </div>
          </ng-template>
        </div>

        <div class="user-info">
          <h1>Olá, {{ u?.nome || 'Usuário' }}</h1>
          <p class="user-location" *ngIf="u?.bairro || u?.cidade">
            {{ u?.bairro ? u?.bairro + ', ' : '' }}{{ u?.cidade || 'Salvador' }}
          </p>
          <span class="user-tag">{{ u?.tipo }}</span>
        </div>
      </div>

      <p class="subtitle">Acompanhe sua participação na rede Food Waste Zero.</p>

      <div [ngSwitch]="user()?.tipo" class="cards">
        <ng-container *ngSwitchCase="'ong'">
          <div>
            <span>Solicitações</span>
            <b>{{ totalLotesSolicitados() }}</b>
            <small>lotes solicitados</small>
          </div>

          <div class="impact-card">
            <span>Impacto Resgatado</span>
            <div class="impact-table">
              <div class="impact-row">
                <span class="lbl">Peso:</span>
                <span class="val"><b>{{ metricasDetalhadas().kg }}</b> kg</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Qtd / Unid:</span>
                <span class="val"><b>{{ metricasDetalhadas().unidades }}</b> un</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Caixas:</span>
                <span class="val"><b>{{ metricasDetalhadas().caixas }}</b> cx</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Litros:</span>
                <span class="val"><b>{{ metricasDetalhadas().litros }}</b> L</span>
              </div>
            </div>
            <small>alimentos salvos do descarte</small>
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

          <div class="impact-card">
            <span>Impacto Resgatado</span>
            <div class="impact-table">
              <div class="impact-row">
                <span class="lbl">Peso:</span>
                <span class="val"><b>{{ metricasDetalhadas().kg }}</b> kg</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Qtd / Unid:</span>
                <span class="val"><b>{{ metricasDetalhadas().unidades }}</b> un</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Caixas:</span>
                <span class="val"><b>{{ metricasDetalhadas().caixas }}</b> cx</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Litros:</span>
                <span class="val"><b>{{ metricasDetalhadas().litros }}</b> L</span>
              </div>
            </div>
            <small>alimentos salvos</small>
          </div>

          <div>
            <span>Comunidade</span>
            <b>{{ totalLotesSolicitados() > 0 ? 1 : 0 }}</b>
            <small>interações realizadas</small>
          </div>
        </ng-container>

        <ng-container *ngSwitchCase="'estabelecimento'">
          <div class="impact-card">
            <span>Doações (Gratuito)</span>
            <div class="impact-table">
              <div class="impact-row">
                <span class="lbl">Peso:</span>
                <span class="val"><b>{{ metricasEstabelecimento().doacoes.kg }}</b> kg</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Qtd / Unid:</span>
                <span class="val"><b>{{ metricasEstabelecimento().doacoes.unidades }}</b> un</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Caixas:</span>
                <span class="val"><b>{{ metricasEstabelecimento().doacoes.caixas }}</b> cx</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Litros:</span>
                <span class="val"><b>{{ metricasEstabelecimento().doacoes.litros }}</b> L</span>
              </div>
            </div>
            <small>destinados a ONGs</small>
          </div>

          <div class="impact-card">
            <span>Vendas com Desconto</span>
            <div class="impact-table">
              <div class="impact-row">
                <span class="lbl">Peso:</span>
                <span class="val"><b>{{ metricasEstabelecimento().descontos.kg }}</b> kg</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Qtd / Unid:</span>
                <span class="val"><b>{{ metricasEstabelecimento().descontos.unidades }}</b> un</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Caixas:</span>
                <span class="val"><b>{{ metricasEstabelecimento().descontos.caixas }}</b> cx</span>
              </div>
              <div class="impact-row">
                <span class="lbl">Litros:</span>
                <span class="val"><b>{{ metricasEstabelecimento().descontos.litros }}</b> L</span>
              </div>
            </div>
            <small>comercializados com valor reduzido</small>
          </div>

          <div>
            <span>Resumo Geral</span>
            <b>{{ totalLotesAnunciados() }}</b>
            <small>lotes cadastrados no total</small>
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
    
    .user-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 15px 0 5px;
    }
    .avatar-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #247b3e;
    }
    .avatar-fallback {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #dcefdc;
      color: #247b3e;
      display: grid;
      place-items: center;
      font: 700 28px 'Space Grotesk', sans-serif;
    }
    
    .user-info h1 {
      font: 700 clamp(32px, 5vw, 52px) 'Space Grotesk', sans-serif;
      margin: 0;
      line-height: 1.1;
    }
    .user-location {
      font-size: 14px;
      font-weight: 700;
      color: #2e8247;
      margin: 4px 0 6px;
    }
    .user-tag {
      display: inline-block;
      background: #edf6ee;
      color: #247b3e;
      border-radius: 12px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
    }

    .subtitle {
      color: #69746c;
      font-size: 18px;
      margin-top: 10px;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 45px 0;
    }
    .cards > div {
      background: #fff;
      padding: 25px;
      border: 1px solid #e0e9e1;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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

    .impact-card {
      background: #fff;
    }
    .impact-table {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 12px;
      margin: 12px 0;
      padding: 10px;
      background: #f7faf7;
      border-radius: 10px;
      border: 1px solid #e2eee3;
    }
    .impact-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
    }
    .impact-row .lbl {
      color: #5d6860;
      font-weight: 600;
    }
    .impact-row .val {
      color: #237b3d;
      font-weight: 700;
    }
    .impact-row .val b {
      display: inline;
      font-size: 16px;
      margin: 0;
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
      .user-header {
        flex-direction: column;
        align-items: flex-start;
      }
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

  get userData(): any {
    return this.user();
  }

  meusLotesResgatados = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return [];
    
    const uId = String(usuarioAtual.id);
    return (this.alimentos() || []).filter((item: any) => {
      const interessado = item.interessadoId ?? item.interessadoUsuarioId;
      return item.temInteressado && String(interessado) === uId;
    });
  });

  meusLotesCadastrados = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return [];

    return (this.alimentos() || []).filter((item: any) => {
      return item.estabelecimento === usuarioAtual.nome || 
             String(item.estabelecimentoId) === String(usuarioAtual.id);
    });
  });

  totalLotesSolicitados = computed(() => this.meusLotesResgatados().length);

  metricasDetalhadas = computed(() => {
    const usuarioAtual = this.user();
    if (!usuarioAtual) return { kg: 0, unidades: 0, caixas: 0, litros: 0 };

    return this.somarMetricas(this.meusLotesResgatados());
  });

  metricasEstabelecimento = computed(() => {
    const todosDoEstabelecimento = this.meusLotesCadastrados();

    const doacoes = todosDoEstabelecimento.filter((item: any) => {
      const preco = parseFloat(item.preco) || 0;
      const tipo = (item.tipo || item.categoria || '').toLowerCase();
      return preco === 0 || item.gratuito || tipo.includes('doacao') || tipo.includes('doação');
    });

    const descontos = todosDoEstabelecimento.filter((item: any) => {
      const preco = parseFloat(item.preco) || 0;
      const tipo = (item.tipo || item.categoria || '').toLowerCase();
      return preco > 0 && !item.gratuito && !tipo.includes('doacao') && !tipo.includes('doação');
    });

    return {
      doacoes: this.somarMetricas(doacoes),
      descontos: this.somarMetricas(descontos)
    };
  });

  private somarMetricas(lista: any[]) {
    let kg = 0;
    let unidades = 0;
    let caixas = 0;
    let litros = 0;

    lista.forEach((item: any) => {
      const qtd = parseFloat(item.quantidade) || 0;
      const un = (item.unidade || item.unidadeMedida || 'kg').toLowerCase();

      if (un.includes('kg') || un.includes('kilo') || un.includes('quilo')) {
        kg += qtd;
      } else if (un.includes('cx') || un.includes('caixa')) {
        caixas += qtd;
      } else if (un.includes('l') || un.includes('litro')) {
        litros += qtd;
      } else {
        unidades += qtd;
      }
    });

    return { kg, unidades, caixas, litros };
  }

  totalKgSalvos = computed(() => this.metricasDetalhadas().kg);

  totalParceirosConectados = computed(() => {
    const estabelecimentos = this.meusLotesResgatados().map((item: any) => item.estabelecimento).filter(Boolean);
    return new Set(estabelecimentos).size;
  });

  totalLotesAnunciados = computed(() => this.meusLotesCadastrados().length);
}