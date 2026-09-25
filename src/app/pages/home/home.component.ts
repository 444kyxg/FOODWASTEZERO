import { Component, OnInit, inject, computed } from '@angular/core';
import { NgFor, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Alimento } from '../../core/models/alimento.model';
import { Ong } from '../../core/models/ong.model';
import { AlimentoService } from '../../core/services/alimento.service';
import { OngService } from '../../core/services/ong.service';
import { FoodCardComponent } from '../../shared/components/food-card/food-card.component';
import { OngCardComponent } from '../../shared/components/ong-card/ong-card.component';

interface Slide {
  tipo: string;
  titulo: string;
  texto: string;
  imagem: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    DecimalPipe, 
    RouterLink, 
    FoodCardComponent, 
    OngCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private alimentoService = inject(AlimentoService);
  private ongService = inject(OngService);

  alimentos: Alimento[] = [];
  ongs: Ong[] = [];
  slideIndex = 0;

  private readonly BASE_KG = 3800;
  private readonly BASE_LOTES = 430;

  slides: Slide[] = [
    {
      tipo: 'AGORA EM DESTAQUE',
      titulo: 'Comida boa não é lixo.',
      texto: 'O Food Waste Zero conecta estabelecimentos, ONGs e pessoas para reduzir o desperdício.',
      imagem: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=85',
      link: '/alimentos'
    },
    {
      tipo: 'IMPACTO LOCAL',
      titulo: 'Quem combate o desperdício também alimenta.',
      texto: 'Conheça as organizações que transformam excedentes em apoio para comunidades de Salvador.',
      imagem: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1400&q=85',
      link: '/ongs'
    }
  ];

  lotesResgatados = computed(() => {
    const todosAlimentos = this.alimentoService.alimentos() || [];
    return todosAlimentos.filter((item: any) => item.temInteressado);
  });

  totalLotesConectados = computed(() => {
    return this.BASE_LOTES + this.lotesResgatados().length;
  });

  totalKgSalvos = computed(() => {
    const kgNovos = this.lotesResgatados().reduce((acc: number, item: any) => {
      const qtd = parseFloat(item.quantidade) || 0;
      return acc + qtd;
    }, 0);
    return this.BASE_KG + kgNovos;
  });

  totalRefeicoes = computed(() => {
    return Math.round(this.totalKgSalvos() * 2.5);
  });

  ngOnInit(): void {
    const resAlimentos = (this.alimentoService as any).getAlimentos?.() || this.alimentoService.alimentos();
    this.alimentos = Array.isArray(resAlimentos) ? resAlimentos : [];

    const resOngs = (this.ongService as any).getOngs?.() || [];
    this.ongs = Array.isArray(resOngs) ? resOngs : [];
  }

  next(): void {
    this.slideIndex = (this.slideIndex + 1) % this.slides.length;
  }

  previous(): void {
    this.slideIndex = (this.slideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goTo(index: number): void {
    this.slideIndex = index;
  }
}