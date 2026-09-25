import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export interface Post {
  id: number;
  autor: string;
  tipo: string;
  tempo: string;
  titulo: string;
  texto: string;
  imagem?: string;
  curtidas: number;
  curtidoPor: (string | number)[];
}

@Component({
  selector: 'app-comunidade',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  template: `
    <section class="head">
      <span>COMUNIDADE FOOD WASTE ZERO</span>
      <h1>Histórias que mostram o impacto.</h1>
      <p>Um espaço para ONGs e participantes compartilharem atualizações, resultados e iniciativas.</p>
    </section>

    <section class="feed">
      <div *ngIf="mensagemAlerta" class="alert-box error">
        <span>{{ mensagemAlerta }}</span>
        <a routerLink="/login" class="alert-link">Fazer Login →</a>
      </div>

      <div *ngIf="ehOng" class="post-creator">
        <h3>Nova Publicação</h3>
        <input 
          type="text" 
          [(ngModel)]="novoTitulo" 
          placeholder="Título da publicação" 
          class="input-title" />
        <textarea 
          [(ngModel)]="novoTexto" 
          placeholder="Compartilhe as novidades da sua ONG..." 
          rows="3">
        </textarea>
        
        <div class="creator-bottom">
          <label class="file-upload-label">
            <span> {{ nomeArquivoSelecionado || 'Escolher imagem do dispositivo' }}</span>
            <input 
              type="file" 
              accept="image/*" 
              (change)="onImagemSelecionada($event)" 
              class="input-file-hidden" />
          </label>

          <button (click)="criarPost()" [disabled]="!novoTitulo.trim() || !novoTexto.trim()" class="btn-publish">
            Publicar
          </button>
        </div>

        <div *ngIf="novaImagemBase64" class="preview-container">
          <img [src]="novaImagemBase64" alt="Pré-visualização" class="preview-img" />
          <button type="button" class="btn-remove-img" (click)="removerImagemSelecionada()"> Remover imagem</button>
        </div>
      </div>

      <div *ngIf="!usuarioLogado && !mensagemAlerta" class="banner-info">
        <span>Faça login para publicar e curtir as ações da comunidade.</span>
        <a routerLink="/login">Entrar →</a>
      </div>

      <article class="post" *ngFor="let post of posts">
        <div class="post-top">
          <div class="avatar">{{ post.autor[0] }}</div>
          <div>
            <b>{{ post.autor }}</b>
            <small>{{ post.tipo }} · {{ post.tempo }}</small>
          </div>
        </div>
        <h2>{{ post.titulo }}</h2>
        <p>{{ post.texto }}</p>
        <div *ngIf="post.imagem" class="post-image" [style.background-image]="'url(' + post.imagem + ')'"></div>
        
        <div class="interactions">
          <button 
            class="btn-like" 
            [class.liked]="foiCurtido(post)" 
            (click)="alternarCurtida(post)">
            {{ foiCurtido(post) ? '♥' : '♡' }} {{ post.curtidas }} {{ post.curtidas === 1 ? 'curtida' : 'curtidas' }}
          </button>
        </div>
      </article>
    </section>
  `,
  styles: [`
    .head{padding:75px 7vw;background:#eff7ef}.head span{font-size:11px;font-weight:800;letter-spacing:.14em;color:#2f8448}.head h1{font:700 clamp(42px,6vw,68px)/1.03 'Space Grotesk';max-width:850px;margin:16px 0}.head p{font-size:18px;color:#68736b;max-width:700px}
    .feed{max-width:760px;margin:auto;padding:55px 20px 90px}
    
    .alert-box {
      margin-bottom: 24px;
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
    .alert-link {
      color: #9b1c1c;
      font-weight: 800;
      text-decoration: underline;
      white-space: nowrap;
    }

    .post-creator{background:#fff;border:1px solid #2f8448;border-radius:20px;padding:22px;margin-bottom:28px;box-shadow:0 4px 18px rgba(47,132,72,0.08)}
    .post-creator h3{margin:0 0 14px;font:700 18px 'Space Grotesk';color:#1e293b}
    .input-title,.post-creator textarea{width:100%;border:1px solid #e4ebe5;border-radius:10px;padding:12px;font-family:inherit;font-size:14px;outline:none;box-sizing:border-box}
    .input-title{margin-bottom:10px;font-weight:700}
    .post-creator textarea{resize:vertical;margin-bottom:10px}
    .creator-bottom{display:flex;gap:10px;align-items:center;justify-content:space-between}

    .file-upload-label {
      flex: 1;
      border: 1px dashed #2f8448;
      background: #f7faf7;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      color: #2f8448;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-upload-label:hover {
      background: #eef5ee;
    }
    .input-file-hidden {
      display: none;
    }

    .preview-container {
      margin-top: 14px;
      position: relative;
      display: inline-block;
      max-width: 100%;
    }
    .preview-img {
      max-height: 180px;
      border-radius: 12px;
      object-fit: cover;
      display: block;
      border: 1px solid #e4ebe5;
    }
    .btn-remove-img {
      background: #fde8e8;
      color: #9b1c1c;
      border: 1px solid #f8b4b4;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 8px;
    }

    .btn-publish{background:#2f8448;color:#fff;border:none;border-radius:10px;padding:10px 22px;font-weight:800;cursor:pointer;transition:.2s}
    .btn-publish:hover:not(:disabled){background:#246a39}
    .btn-publish:disabled{background:#a0cbb0;cursor:not-allowed}

    .banner-info{background:#fef3c7;color:#92400e;padding:12px 18px;border-radius:12px;font-size:13px;font-weight:600;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center}
    .banner-info a{color:#92400e;font-weight:800;text-decoration:underline}

    .post{background:#fff;border:1px solid #e4ebe5;border-radius:20px;padding:22px;margin-bottom:20px}
    .post-top{display:flex;gap:12px;align-items:center}
    .avatar{width:42px;height:42px;border-radius:50%;background:#dcefdc;color:#26783d;display:grid;place-items:center;font-weight:800}
    .post-top b,.post-top small{display:block}
    .post-top small{color:#818b83;font-size:12px;margin-top:3px}
    .post h2{font:700 22px 'Space Grotesk';margin:22px 0 7px}
    .post p{color:#667168;line-height:1.65}
    .post-image{height:290px;background-size:cover;background-position:center;border-radius:14px;margin-top:18px}
    
    .interactions{padding-top:15px;border-top:1px solid #f1f6f1;margin-top:15px}
    .btn-like{background:none;border:none;color:#536158;font-size:14px;font-weight:700;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;transition:color 0.2s}
    .btn-like:hover{color:#dc2626}
    .btn-like.liked{color:#dc2626}

    @media(max-width:600px){.head{padding:50px 6vw}.feed{padding:35px 12px}.post-image{height:230px}.creator-bottom{flex-direction:column}}
  `]
})
export class ComunidadeComponent implements OnInit {
  posts: Post[] = [];
  novoTitulo = '';
  novoTexto = '';
  novaImagemBase64: string | null = null;
  nomeArquivoSelecionado: string | null = null;
  mensagemAlerta: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.carregarPosts();
  }

  get usuarioLogado(): any {
    const auth = this.authService as any;
    return auth.getCurrentUser?.() || auth.getUsuarioAtual?.() || auth.usuarioAtual?.() || auth.currentUser || auth.user;
  }

  get ehOng(): boolean {
    const u = this.usuarioLogado;
    return !!u && u.tipo === 'ong';
  }

  get usuarioId(): string | number | null {
    const u = this.usuarioLogado;
    return u ? (u.id || u.email) : null;
  }

  carregarPosts(): void {
    const salvos = localStorage.getItem('comunidade_posts');
    if (salvos) {
      try {
        this.posts = JSON.parse(salvos);
      } catch (e) {
        this.posts = this.getPostsIniciais();
      }
    } else {
      this.posts = this.getPostsIniciais();
      this.salvarPosts();
    }
  }

  onImagemSelecionada(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.nomeArquivoSelecionado = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.novaImagemBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagemSelecionada(): void {
    this.novaImagemBase64 = null;
    this.nomeArquivoSelecionado = null;
  }

  criarPost(): void {
    if (!this.ehOng || !this.novoTitulo.trim() || !this.novoTexto.trim()) return;

    const novo: Post = {
      id: Date.now(),
      autor: this.usuarioLogado.nome || this.usuarioLogado.razaoSocial || 'ONG Parceira',
      tipo: 'ONG parceira',
      tempo: 'agora mesmo',
      titulo: this.novoTitulo.trim(),
      texto: this.novoTexto.trim(),
      imagem: this.novaImagemBase64 || undefined,
      curtidas: 0,
      curtidoPor: []
    };

    this.posts.unshift(novo);
    this.salvarPosts();

    this.novoTitulo = '';
    this.novoTexto = '';
    this.removerImagemSelecionada();
    this.mensagemAlerta = null;
  }

  foiCurtido(post: Post): boolean {
    if (!this.usuarioId) return false;
    return post.curtidoPor.some(id => String(id) === String(this.usuarioId));
  }

  alternarCurtida(post: Post): void {
    this.mensagemAlerta = null;

    if (!this.usuarioId) {
      this.mensagemAlerta = 'Você precisa estar logado para curtir uma publicação.';
      return;
    }

    const index = post.curtidoPor.findIndex(id => String(id) === String(this.usuarioId));

    if (index !== -1) {
      post.curtidoPor.splice(index, 1);
      post.curtidas = Math.max(0, post.curtidas - 1);
    } else {
      post.curtidoPor.push(this.usuarioId);
      post.curtidas += 1;
    }

    this.salvarPosts();
  }

  private salvarPosts(): void {
    localStorage.setItem('comunidade_posts', JSON.stringify(this.posts));
  }

  private getPostsIniciais(): Post[] {
    return [
      { 
        id: 1,
        autor: 'Instituto Mesa Solidária', 
        tipo: 'ONG parceira', 
        tempo: 'há 2h', 
        titulo: 'Mais 120 refeições chegaram às famílias do bairro.', 
        texto: 'Hoje transformamos lotes recebidos pela rede em refeições prontas para distribuição. Obrigado a cada estabelecimento e voluntário que fez parte dessa conexão.', 
        imagem: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1000&q=80', 
        curtidas: 42,
        curtidoPor: []
      },
      { 
        id: 2,
        autor: 'Padaria da Cidade', 
        tipo: 'Estabelecimento', 
        tempo: 'ontem', 
        titulo: 'Nosso primeiro lote de doação!', 
        texto: 'Em vez de descartar pães no fim do dia, decidimos disponibilizar o excedente para a rede. Queremos repetir essa iniciativa.', 
        imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80', 
        curtidas: 31,
        curtidoPor: []
      }
    ];
  }
}