import api from "./api";

export async function finalizarPedido(itens) {
  const valorTotal = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);
  const clienteId = localStorage.getItem('clienteId');
  let cliente = null;
  if (clienteId) {
    // Busca os dados do cliente localmente (opcional: pode ser só o id)
    const nome = localStorage.getItem('clienteNome') || '';
    const email = localStorage.getItem('clienteEmail') || '';
    const telefone = localStorage.getItem('clienteTelefone') || '';
    cliente = { id: Number(clienteId), nome, email, telefone };
  }
  const pedido = {
    cliente,
    itens,
    valorTotal
  };
  const response = await api.post("/api/pedidos", pedido);
  return response.data;
}
