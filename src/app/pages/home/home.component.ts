import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Alimento } from '../../core/models/alimento.model';
import { Ong } from '../../core/models/ong.model';
import { AlimentoService } from '../../core/services/alimento.service';
import { OngService } from '../../core/services/ong.service';
import { FoodCardComponent } from '../../shared/components/food-card/food-card.component';

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
  imports: [NgFor, NgIf, SlicePipe, RouterLink, FoodCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  alimentos: Alimento[] = [];
  ongs: Ong[] = [];
  slideIndex = 0;

  slides: Slide[] = [
    {
      tipo: 'DESTAQUE DO DIA',
      titulo: 'Frutas boas por menos.',
      texto: 'Cestas de frutas que perderiam espaço na prateleira estão disponíveis por R$ 12,90 na Pituba.',
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

  constructor(
    private alimentoService: AlimentoService,
    private ongService: OngService
  ) {}

  ngOnInit(): void {
    const resAlimentos = (this.alimentoService as any).getAlimentos();
    this.alimentos = Array.isArray(resAlimentos) ? resAlimentos : (typeof resAlimentos === 'function' ? resAlimentos() : []);

    const resOngs = (this.ongService as any).getOngs();
    this.ongs = Array.isArray(resOngs) ? resOngs : (typeof resOngs === 'function' ? resOngs() : []);
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