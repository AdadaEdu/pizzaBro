import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import { finalizarPedido } from "./finalizarPedido";

export interface CartItem {
  nomePizza: string;
  quantidade: number;
  precoUnitario: number;
}

interface CartContextType {
  itens: CartItem[];
  adicionarItem: (item: CartItem) => void;
  limparCarrinho: () => void;
  finalizarPedidoCarrinho: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  function adicionarItem(item: CartItem) {
    setItens([...itens, item]);
  }

  function limparCarrinho() {
    setItens([]);
  }

  async function finalizarPedidoCarrinho() {
    if (itens.length === 0) return;
    const valorTotal = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);
    await finalizarPedido(itens);
    const pedidoResumo = { itens, valorTotal };
    setItens([]);
    navigate('/pedido-finalizado', { state: { pedido: pedidoResumo } });
  }

  return (
    <CartContext.Provider value={{ itens, adicionarItem, limparCarrinho, finalizarPedidoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}
