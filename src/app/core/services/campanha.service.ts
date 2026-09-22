import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Campanha } from '../models/campanha.model';
import { CAMPANHAS } from '../../mocks/campanhas.mock';

@Injectable({ providedIn: 'root' })
export class CampanhaService {
  getCampanhas(): Observable<Campanha[]> {
    return of(CAMPANHAS);
  }
}
