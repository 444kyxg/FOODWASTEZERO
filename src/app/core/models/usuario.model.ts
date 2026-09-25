export interface Usuario {
  id: number | string;
  nome: string;
  email: string;
  tipo: 'consumidor' | 'estabelecimento' | 'ong';
  cnpj?: string;
  causa?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
  foto?: string;
  imagem?: string;
  descricao?: string;
}