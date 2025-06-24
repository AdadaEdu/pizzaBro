export interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}

export interface Pizza {
  id: number;
  sabor: string;
  ingredientes: Ingrediente[];
  cardapio: Cardapio[];
}

export interface Ingrediente {
  id: number;
  ingrediente: string;
  quantidade: string;
  pizza?: Pizza | number;
}

export interface Cardapio {
  id: number;
  valor: number;
  tamanho: string;
  pizza?: Pizza | number;
}

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface Pedido {
  id?: number;
  cliente: Cliente;
  itens: CartItem[];
  valorTotal: number;
}

export interface CartItem {
  nomePizza: string;
  quantidade: number;
  precoUnitario: number;
}
