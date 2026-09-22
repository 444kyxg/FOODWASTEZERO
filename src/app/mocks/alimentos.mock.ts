import { Alimento } from '../core/models/alimento.model';

export const ALIMENTOS: Alimento[] = [
  {
    id: 1, nome: 'Cestas de frutas selecionadas', categoria: 'Frutas',
    quantidade: 15, unidade: 'cestas', estabelecimento: 'Hortifruti Salvador',
    bairro: 'Pituba', cidade: 'Salvador', validade: '23/09/2026',
    tipo: 'desconto', preco: 12.90, imagem: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80',
    urgente: true
  },
  {
    id: 2, nome: 'Pães variados', categoria: 'Padaria',
    quantidade: 30, unidade: 'unidades', estabelecimento: 'Padaria da Cidade',
    bairro: 'Itapuã', cidade: 'Salvador', validade: '22/09/2026',
    tipo: 'doacao', imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    urgente: true
  },
  {
    id: 3, nome: 'Legumes selecionados', categoria: 'Legumes',
    quantidade: 20, unidade: 'kg', estabelecimento: 'Mercado Salvador',
    bairro: 'Brotas', cidade: 'Salvador', validade: '25/09/2026',
    tipo: 'desconto', preco: 8.50, imagem: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    urgente: false
  },
  {
    id: 4, nome: 'Leite integral', categoria: 'Laticínios',
    quantidade: 42, unidade: 'litros', estabelecimento: 'Mercadinho da Bahia',
    bairro: 'Federação', cidade: 'Salvador', validade: '24/09/2026',
    tipo: 'desconto', preco: 3.99, imagem: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80',
    urgente: false
  },
  {
    id: 5, nome: 'Arroz e feijão', categoria: 'Mercearia',
    quantidade: 25, unidade: 'kits', estabelecimento: 'Supermercado Solidário',
    bairro: 'São Marcos', cidade: 'Salvador', validade: '30/09/2026',
    tipo: 'doacao', imagem: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    urgente: false
  }
];
