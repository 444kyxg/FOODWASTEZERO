export interface Alimento {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  estabelecimento: string;
  bairro: string;
  cidade: string;
  validade: string;
  tipo: 'desconto' | 'doacao';
  preco?: number;
  imagem: string;
  urgente: boolean;
}
