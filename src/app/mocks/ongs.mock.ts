import { Ong } from '../core/models/ong.model';

export const ONGS: Ong[] = [
  {
    id: 1,
    nome: 'Instituto Mesa Solidária',
    descricao: 'Rede comunitária de apoio alimentar e distribuição de refeições.',
    bairro: 'Liberdade',
    cidade: 'Salvador',
    imagem: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=900&q=80',
    refeicoesDistribuidas: 12800
  },
  {
    id: 2,
    nome: 'Projeto Prato Cheio',
    descricao: 'Atuação com famílias em situação de vulnerabilidade na região metropolitana.',
    bairro: 'São Caetano',
    cidade: 'Salvador',
    imagem: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
    refeicoesDistribuidas: 8450
  },
  {
    id: 3,
    nome: 'Rede Alimento para Todos',
    descricao: 'Conecta doadores, voluntários e instituições para reduzir o desperdício.',
    bairro: 'Brotas',
    cidade: 'Salvador',
    imagem: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80',
    refeicoesDistribuidas: 6210
  }
];
