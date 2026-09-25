import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlimentoService } from '../../core/services/alimento.service';
import { AuthService } from '../../core/services/auth.service';

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

        <div *ngIf="mensagemErro" class="alert-box error">
          <span>{{ mensagemErro }}</span>
          <a routerLink="/login" class="alert-link">Fazer Login →</a>
        </div>

        <div *ngIf="item.temInteressado && souDonoDoLote" class="alert-box info-interessado">
          <div class="info-content">
            <div class="info-title">Interesse Registrado!</div>
            <p class="info-detail">
              <strong>Nome do Interessado:</strong> {{ item.interessadoNome || 'Usuário Registrado' }}<br>
              <span *ngIf="item.interessadoContato">
                <strong>Contato / E-mail:</strong> {{ item.interessadoContato }}
              </span>
            </p>
          </div>
        </div>

        <div *ngIf="jaReservado && !souDonoDoLote" class="alert-box warning">
          <span>⚠️ Este lote já possui uma pessoa interessada.</span>
        </div>

        <button 
          *ngIf="!souDonoDoLote"
          class="reserve" 
          [class.active]="demonstrouInteresse"
          [disabled]="jaReservado && !demonstrouInteresse"
          (click)="tenhoInteresse()">
          
          <ng-container *ngIf="demonstrouInteresse">✕ Retirar meu interesse</ng-container>
          <ng-container *ngIf="!demonstrouInteresse && jaReservado">Lote Indisponível</ng-container>
          <ng-container *ngIf="!demonstrouInteresse && !jaReservado">Tenho interesse</ng-container>
        </button>

        <p class="note">Demonstração acadêmica: apenas usuários conectados podem registrar interesse.</p>
        <a routerLink="/alimentos">← Voltar para alimentos</a>
      </div>
    </section>

    <section class="not-found" *ngIf="!alimento">
      <h2>Lote não encontrado.</h2><a routerLink="/alimentos">Ver alimentos</a>
    </section>
  `,
  styles: [`
    .details{max-width:1150px;margin:70px auto;padding:0 30px;display:grid;grid-template-columns:1fr 1fr;gap:55px;align-items:center}
    .details>img{width:100%;height:540px;object-fit:cover;border-radius:28px}
    .tag{font-size:11px;font-weight:800;letter-spacing:.12em;color:#2b8447}
    .content h1{font:700 55px/1 'Space Grotesk';color:#18221a;margin:14px 0}
    .intro{color:#68746c;font-size:18px;line-height:1.6}
    .facts{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:28px 0}
    .facts div{background:#f1f6f1;border-radius:12px;padding:15px}
    .facts small,.facts b{display:block}
    .facts small{color:#7b867e;font-size:12px}
    .facts b{margin-top:5px;color:#2a352c}
    .price{font:700 28px 'Space Grotesk';color:#227b3d}
    .price.free{color:#a86a1e}

    .alert-box {
      margin-top: 18px;
      padding: 14px 18px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .alert-box.error {
      background-color: #fde8e8;
      color: #9b1c1c;
      border: 1px solid #f8b4b4;
    }
    .alert-box.warning {
      background-color: #fef3c7;
      color: #92400e;
      border: 1px solid #fcd34d;
    }
    .alert-box.info-interessado {
      background-color: #e0f2fe;
      color: #0369a1;
      border: 1px solid #bae6fd;
      display: block;
    }
    .info-title {
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 6px;
      color: #0369a1;
    }
    .info-detail {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: #075985;
    }

    .alert-link {
      color: #9b1c1c;
      font-weight: 800;
      text-decoration: underline;
      white-space: nowrap;
    }

    .reserve{width:100%;margin:18px 0 7px;padding:15px;border:0;border-radius:12px;background:#247e40;color:#fff;font-weight:800;font-size:15px;cursor:pointer;transition:.2s}
    .reserve:hover:not(:disabled){background:#1d6634}
    
    .reserve.active{background:#c53030;cursor:pointer}
    .reserve.active:hover{background:#9b2c2c}

    .reserve:disabled{background:#a2bba6;cursor:not-allowed;opacity:0.8}

    .note{font-size:11px;color:#879087}
    .content>a{display:inline-block;margin-top:18px;color:#247b3e;font-weight:700}
    .not-found{text-align:center;padding:100px}.not-found a{color:#247b3e}
    @media(max-width:800px){.details{grid-template-columns:1fr;margin:35px auto}.details>img{height:330px}.content h1{font-size:43px}}
  `]
})
export class AlimentoDetalhesComponent implements OnInit {
  alimento?: any;
  demonstrouInteresse = false;
  jaReservado = false;
  mensagemErro: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private service: AlimentoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  private getUsuarioAtual(): any {
    const auth = this.authService as any;
    return auth.getCurrentUser?.() || auth.getUsuarioAtual?.() || auth.usuarioAtual?.() || auth.currentUser || auth.user;
  }

  private getUsuarioIdAtual(): string | null {
    const user = this.getUsuarioAtual();
    if (!user) return null;
    return String(user.id || user.email);
  }

  get souDonoDoLote(): boolean {
    const user = this.getUsuarioAtual();
    if (!user || user.tipo !== 'estabelecimento') return false;
    return this.alimento?.estabelecimento === user.nome || String(this.alimento?.usuarioId) === String(user.id);
  }

  private carregarDados(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const alimentoEncontrado = this.service.getAlimentoById(id);
    const uId = this.getUsuarioIdAtual();

    if (alimentoEncontrado) {
      this.alimento = alimentoEncontrado;
      
      if (this.alimento.temInteressado) {
        const idInteressado = this.alimento.interessadoId ?? this.alimento.interessadoUsuarioId;

        if (uId && idInteressado && String(idInteressado) === String(uId)) {
          this.demonstrouInteresse = true;
          this.jaReservado = false;
        } else {
          this.demonstrouInteresse = false;
          this.jaReservado = true;
        }

        if (!this.alimento.interessadoNome && idInteressado) {
          const userAtual = this.getUsuarioAtual();
          if (userAtual && String(userAtual.id || userAtual.email) === String(idInteressado)) {
            this.alimento.interessadoNome = userAtual.nome || userAtual.razaoSocial || userAtual.email;
            this.alimento.interessadoContato = userAtual.telefone || userAtual.email;
          }
        }
      } else {
        this.demonstrouInteresse = false;
        this.jaReservado = false;
      }
    }
  }

  tenhoInteresse(): void {
    this.mensagemErro = null;

    if (!this.authService.isAuthenticated()) {
      this.mensagemErro = 'Apenas usuários autenticados podem demonstrar interesse neste lote.';
      return;
    }

    if (!this.alimento) return;

    const user = this.getUsuarioAtual();
    if (!user) return;

    const uId = String(user.id || user.email);
    const uNome = user.nome || user.razaoSocial || user.email || 'Usuário Registrado';
    const uContato = user.telefone || user.email || '';

    if (this.demonstrouInteresse) {
      this.service.cancelarInteresse(this.alimento.id);
      
      this.demonstrouInteresse = false;
      this.jaReservado = false;
      this.alimento.temInteressado = false;
      delete this.alimento.interessadoId;
      delete this.alimento.interessadoUsuarioId;
      delete this.alimento.interessadoNome;
      delete this.alimento.interessadoContato;

      this.persistirAlimento();

    } else {
      this.service.registrarInteresse(this.alimento.id, uId);

      this.demonstrouInteresse = true;
      this.jaReservado = false;
      this.alimento.temInteressado = true;
      this.alimento.interessadoId = uId;
      this.alimento.interessadoUsuarioId = uId;
      this.alimento.interessadoNome = uNome;
      this.alimento.interessadoContato = uContato;

      this.persistirAlimento();
    }
  }

  private persistirAlimento(): void {
    const service = this.service as any;
    
    if (typeof service.atualizarAlimento === 'function') {
      service.atualizarAlimento(this.alimento);
    } else if (typeof service.salvar === 'function') {
      service.salvar(this.alimento);
    }

    try {
      const alimentosSalvos = JSON.parse(localStorage.getItem('alimentos') || '[]');
      const index = alimentosSalvos.findIndex((a: any) => Number(a.id) === Number(this.alimento.id));
      if (index !== -1) {
        alimentosSalvos[index] = { ...alimentosSalvos[index], ...this.alimento };
        localStorage.setItem('alimentos', JSON.stringify(alimentosSalvos));
      }
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }
}