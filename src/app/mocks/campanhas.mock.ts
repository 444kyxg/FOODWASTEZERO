import { Campanha } from '../core/models/campanha.model';

export const CAMPANHAS: Campanha[] = [
  {
    id: 1,
    titulo: 'Cestas para 100 famílias',
    descricao: 'Apoie a compra de itens básicos para famílias atendidas em Salvador.',
    meta: 5000,
    arrecadado: 3270,
    imagem: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    titulo: 'Cozinha comunitária',
    descricao: 'Contribua para a manutenção de uma cozinha que transforma doações em refeições.',
    meta: 8000,
    arrecadado: 5440,
    imagem: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'
  }
];
