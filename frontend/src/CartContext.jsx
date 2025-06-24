import React, { createContext, useState } from "react";
import { finalizarPedido } from "./finalizarPedido";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarItem(item) {
    setItens([...itens, item]);
  }

  function limparCarrinho() {
    setItens([]);
  }

  async function finalizarPedidoCarrinho() {
    if (itens.length === 0) return;
    await finalizarPedido(itens);
    setItens([]);
  }

  return (
    <CartContext.Provider value={{ itens, adicionarItem, limparCarrinho, finalizarPedidoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}
