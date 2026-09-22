import { Injectable, signal } from '@angular/core';

export interface Toast {
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'aviso';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toasts = signal<Toast[]>([]);

  show(mensagem: string, tipo: 'sucesso' | 'erro' | 'aviso' = 'aviso'): void {
    const id = Date.now();
    this.toasts.update(current => [...current, { mensagem, tipo, id }]);

    setTimeout(() => {
      this.remove(id);
    }, 4000);
  }

  remove(id: number): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}