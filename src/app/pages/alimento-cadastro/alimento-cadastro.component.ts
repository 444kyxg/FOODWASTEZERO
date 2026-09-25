import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlimentoService } from '../../core/services/alimento.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-alimento-cadastro',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  template: `
    <section class="form-container">
      <div class="form-card">
        <span class="tag">PAINEL DO ESTABELECIMENTO</span>
        <h1>Cadastrar Novo Lote</h1>
        <p class="subtitle">Disponibilize alimentos para doação ou com desconto em Salvador.</p>

        <form (ngSubmit)="cadastrarLote()">
          <div class="form-group">
            <label>Nome do Alimento / Lote *</label>
            <input type="text" [(ngModel)]="novoAlimento.nome" name="nome" placeholder="Ex: Cesta de Frutas e Verduras" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Tipo de Oferta *</label>
              <select [(ngModel)]="novoAlimento.tipo" name="tipo">
                <option value="doacao">Doação Gratuita</option>
                <option value="desconto">Venda com Desconto</option>
              </select>
            </div>

            <div class="form-group" *ngIf="novoAlimento.tipo === 'desconto'">
              <label>Preço (R$) *</label>
              <input type="number" step="0.01" [(ngModel)]="novoAlimento.preco" name="preco" placeholder="0.00" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Categoria *</label>
              <select [(ngModel)]="novoAlimento.categoria" name="categoria">
                <option value="Frutas">Frutas</option>
                <option value="Padaria">Padaria</option>
                <option value="Legumes">Legumes</option>
                <option value="Laticínios">Laticínios</option>
                <option value="Mercearia">Mercearia</option>
              </select>
            </div>

            <div class="form-group">
              <label>Quantidade *</label>
              <input type="number" [(ngModel)]="novoAlimento.quantidade" name="quantidade" placeholder="Ex: 10" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Unidade de Medida *</label>
              <select [(ngModel)]="novoAlimento.unidade" name="unidade">
                <option value="kg">Quilogramas (kg)</option>
                <option value="unidades">Unidades</option>
                <option value="caixas">Caixas</option>
                <option value="litros">Litros</option>
              </select>
            </div>

            <div class="form-group">
              <label>Data de Validade *</label>
              <input type="text" [(ngModel)]="novoAlimento.validade" name="validade" placeholder="Ex: 28/09/2026 ou 3 dias" required>
            </div>
          </div>

          <div class="form-group">
            <label>Endereço em Salvador *</label>
            <input type="text" [(ngModel)]="novoAlimento.bairro" name="bairro" placeholder="Ex: Pero Vaz, Massaranduba, Garcia" required>
          </div>

          <div class="form-group">
            <label>Foto do Lote</label>
            <div class="upload-area">
              <input 
                type="file" 
                id="file-input" 
                accept="image/*" 
                (change)="aoSelecionarImagem($event)"
                class="file-input">
              
              <label for="file-input" class="file-label">
                <span *ngIf="!imagemPreview"> Escolher foto do dispositivo</span>
                <span *ngIf="imagemPreview"> Trocar imagem selecionada</span>
              </label>

              <div *ngIf="imagemPreview" class="preview-container">
                <img [src]="imagemPreview" alt="Pré-visualização do alimento" class="image-preview">
                <button type="button" class="btn-remove-img" (click)="removerImagem()">Remover foto</button>
              </div>
            </div>
            <small>Formato recomendado: JPG ou PNG.</small>
          </div>

          <div *ngIf="mensagemErro" class="alert-error">
            {{ mensagemErro }}
          </div>

          <div class="actions">
            <button type="submit" class="btn-submit">Publicar Lote</button>
            <a routerLink="/alimentos" class="btn-cancel">Cancelar</a>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .form-container { padding: 60px 20px; background: #f2f7f2; min-height: 80vh; display: grid; place-items: center; }
    .form-card { background: #fff; max-width: 650px; width: 100%; padding: 40px; border-radius: 24px; border: 1px solid #e1e9e2; box-shadow: 0 10px 30px rgba(0,0,0,0.03); box-sizing: border-box; }
    .tag { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: #2b8447; display: block; margin-bottom: 8px; }
    h1 { font: 700 32px 'Space Grotesk', sans-serif; color: #18221a; margin: 0 0 8px; }
    .subtitle { color: #68746c; font-size: 14px; margin-bottom: 28px; }
    
    .form-group { margin-bottom: 20px; flex: 1; }
    .form-row { display: flex; gap: 16px; }
    label { display: block; font-size: 13px; font-weight: 700; color: #2a352c; margin-bottom: 6px; }
    input, select { width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid #c8d6c9; border-radius: 10px; font: inherit; background: #fafdfa; }
    input:focus, select:focus { outline: none; border-color: #247e40; background: #fff; }
    small { font-size: 11px; color: #879087; margin-top: 6px; display: block; }

    .file-input { display: none; }
    .file-label {
      display: inline-block;
      width: 100%;
      text-align: center;
      padding: 14px;
      background: #f1f7f2;
      border: 2px dashed #9bc3a0;
      border-radius: 12px;
      color: #247e40;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      box-sizing: border-box;
      transition: background 0.2s, border-color 0.2s;
    }
    .file-label:hover { background: #e5f0e6; border-color: #247e40; }
    
    .preview-container { margin-top: 12px; text-align: center; }
    .image-preview { width: 100%; max-height: 220px; object-fit: cover; border-radius: 12px; border: 1px solid #d0ded1; }
    .btn-remove-img { background: transparent; border: none; color: #c53030; font-size: 12px; font-weight: 700; cursor: pointer; margin-top: 6px; text-decoration: underline; }

    .alert-error { background: #fde8e8; color: #9b1c1c; padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 700; margin-bottom: 20px; }

    .actions { display: flex; gap: 12px; align-items: center; margin-top: 28px; }
    .btn-submit { flex: 2; background: #247e40; color: #fff; border: 0; padding: 14px; border-radius: 12px; font-weight: 800; font-size: 15px; cursor: pointer; transition: 0.2s; }
    .btn-submit:hover { background: #1d6634; }
    .btn-cancel { flex: 1; text-align: center; color: #556057; font-weight: 700; text-decoration: none; padding: 14px; }
    
    @media(max-width: 600px) { .form-row { flex-direction: column; gap: 0; } }
  `]
})
export class AlimentoCadastroComponent implements OnInit {
  mensagemErro: string | null = null;
  imagemPreview: string | null = null;

  novoAlimento = {
    nome: '',
    tipo: 'doacao',
    categoria: 'Frutas',
    preco: null as number | null,
    quantidade: null as number | null,
    unidade: 'kg',
    validade: '',
    bairro: '',
    imagem: '',
    estabelecimento: ''
  };

  constructor(
    private alimentoService: AlimentoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const auth = this.authService as any;
    const user = auth.getCurrentUser?.() || auth.getUsuarioAtual?.() || auth.usuarioAtual?.() || auth.currentUser;

    if (user) {
      this.novoAlimento.estabelecimento = user.nome || 'Estabelecimento Cadastrado';
    }
  }

  aoSelecionarImagem(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 2 * 1024 * 1024) {
        this.mensagemErro = 'A imagem escolhida deve ter no máximo 2MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
        this.novoAlimento.imagem = reader.result as string;
        this.mensagemErro = null;
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagem(): void {
    this.imagemPreview = null;
    this.novoAlimento.imagem = '';
  }

  cadastrarLote(): void {
    this.mensagemErro = null;

    if (!this.novoAlimento.nome || !this.novoAlimento.quantidade || !this.novoAlimento.validade) {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios (*).';
      return;
    }

    const precoNum = this.novoAlimento.preco ? Number(this.novoAlimento.preco) : 0;

    if (this.novoAlimento.tipo === 'desconto' && precoNum <= 0) {
      this.mensagemErro = 'Informe um preço válido para o lote com desconto.';
      return;
    }

    const imagemPadrao = 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800';

    const service = this.alimentoService as any;
    const metodoCadastrar = service.cadastrar || service.cadastrarAlimento || service.adicionar;

    if (typeof metodoCadastrar === 'function') {
      metodoCadastrar.call(service, {
        nome: this.novoAlimento.nome,
        tipo: this.novoAlimento.tipo,
        categoria: this.novoAlimento.categoria,
        preco: this.novoAlimento.tipo === 'doacao' ? undefined : precoNum,
        quantidade: Number(this.novoAlimento.quantidade),
        unidade: this.novoAlimento.unidade,
        validade: this.novoAlimento.validade,
        bairro: this.novoAlimento.bairro,
        estabelecimento: this.novoAlimento.estabelecimento || 'Estabelecimento Parceiro',
        imagem: this.novoAlimento.imagem || imagemPadrao
      });
    }

    this.router.navigate(['/alimentos']);
  }
}