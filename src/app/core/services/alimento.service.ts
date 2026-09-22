import { Injectable, signal } from '@angular/core';
import { Alimento } from '../models/alimento.model';
import { ALIMENTOS } from '../../mocks/alimentos.mock';

const ALIMENTOS_KEY = 'fwz_alimentos';

@Injectable({ providedIn: 'root' })
export class AlimentoService {
  alimentos = signal<Alimento[]>(this.carregarAlimentos());

  getAlimentos(): Alimento[] {
    return this.alimentos();
  }

  getAlimentoById(id: number): Alimento | undefined {
    return this.alimentos().find(item => item.id === id);
  }

  getUrgentes(): Alimento[] {
    return this.alimentos().filter(item => (item as any).urgente);
  }

  cadastrar(alimento: Omit<Alimento, 'id'>): void {
    const novo: Alimento = { ...alimento, id: Date.now() } as Alimento;
    const lista = [novo, ...this.alimentos()];
    localStorage.setItem(ALIMENTOS_KEY, JSON.stringify(lista));
    this.alimentos.set(lista);
  }

  private carregarAlimentos(): Alimento[] {
    const raw = localStorage.getItem(ALIMENTOS_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(ALIMENTOS_KEY, JSON.stringify(ALIMENTOS));
    return ALIMENTOS;
  }
}