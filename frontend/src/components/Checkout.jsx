import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Checkout() {
  const { itens, limparCarrinho } = useContext(CartContext);

  function finalizarPedido() {
    fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteNome: "Cliente Exemplo",
        itens,
        valorTotal: itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0),
      }),
    })
    .then(() => {
      alert("Pedido finalizado com sucesso!");
      limparCarrinho();
    })
    .catch((error) => {
      console.error("Erro ao finalizar pedido:", error);
    });
  }

  return (
    <button onClick={finalizarPedido} disabled={itens.length === 0}>
      Finalizar Pedido
    </button>
  );
}
