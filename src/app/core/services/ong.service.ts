import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ong } from '../models/ong.model';
import { ONGS } from '../../mocks/ongs.mock';

@Injectable({ providedIn: 'root' })
export class OngService {
  getOngs(): Observable<Ong[]> {
    return of(ONGS);
  }
}
