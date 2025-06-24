import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";

export function Cart({ cliente, onNovoPedido }) {
  const cart = useContext(CartContext);
  const [finalizado, setFinalizado] = useState(false);
  const [resumo, setResumo] = useState(null);
  if (!cart) return null;
  const { itens, limparCarrinho, finalizarPedidoCarrinho } = cart;

  const total = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);

  async function handleFinalizar() {
    await finalizarPedidoCarrinho();
    setResumo({ cliente, itens, valorTotal: total });
    setFinalizado(true);
    limparCarrinho();
  }

  function handleNovoPedido() {
    setFinalizado(false);
    setResumo(null);
    if (onNovoPedido) onNovoPedido();
  }

  if (finalizado && resumo) {
    return (
      <div className="pedido-finalizado" style={{background: '#fffbe7', borderRadius: 12, padding: 24, marginTop: 24, textAlign: 'center'}}>
        <h2 style={{color: '#7c2f13'}}>Pedido Finalizado!</h2>
        <p><strong>Cliente:</strong> {resumo.cliente.nome}</p>
        <ul style={{listStyle: 'none', padding: 0}}>
          {resumo.itens.map((item, idx) => (
            <li key={idx}>{item.nomePizza} - {item.quantidade} x R$ {item.precoUnitario}</li>
          ))}
        </ul>
        <p><strong>Total:</strong> R$ {resumo.valorTotal.toFixed(2)}</p>
        <p style={{color: '#388e3c', fontWeight: 600}}>Seu pedido foi recebido com sucesso!</p>
        <button style={{marginTop: 16}} onClick={handleNovoPedido}>Novo Pedido</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="cart-title">Carrinho</h2>
      {cliente && (
        <div style={{ fontWeight: 600, color: '#7c2f13', marginBottom: 8 }}>
          Cliente: {cliente.nome} ({cliente.email} | {cliente.telefone})
        </div>
      )}
      <ul>
        {itens.map((item, i) => (
          <li key={i}>{item.nomePizza} - {item.quantidade} x R$ {item.precoUnitario}</li>
        ))}
      </ul>
      <p className="cart-total">Total: R$ {total.toFixed(2)}</p>
      <button onClick={limparCarrinho}>Limpar Carrinho</button>
      <button onClick={handleFinalizar} disabled={itens.length === 0} style={{marginLeft: 8}}>
        Finalizar Pedido
      </button>
    </div>
  );
}
