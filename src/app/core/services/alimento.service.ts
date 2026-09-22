import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alimento } from '../models/alimento.model';
import { ALIMENTOS } from '../../mocks/alimentos.mock';

@Injectable({ providedIn: 'root' })
export class AlimentoService {
  getAlimentos(): Observable<Alimento[]> {
    return of(ALIMENTOS);
  }

  getAlimentoById(id: number): Observable<Alimento | undefined> {
    return of(ALIMENTOS.find(item => item.id === id));
  }

  getUrgentes(): Observable<Alimento[]> {
    return of(ALIMENTOS.filter(item => item.urgente));
  }
}
