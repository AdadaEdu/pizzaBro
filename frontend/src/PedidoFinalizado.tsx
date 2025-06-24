import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import type { CartItem } from './CartContext';

interface PedidoResumo {
  itens: CartItem[];
  valorTotal: number;
}

const PedidoFinalizado: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido: PedidoResumo | undefined = location.state?.pedido;

  if (!pedido) {
    return (
      <Box mt={4}>
        <Typography variant="h5">Nenhum pedido encontrado.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>Voltar ao Menu</Button>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>Pedido Finalizado!</Typography>
      <Typography variant="h6" gutterBottom>Resumo do Pedido:</Typography>
      <ul>
        {pedido.itens.map((item, i) => (
          <li key={i}>{item.nomePizza} - {item.quantidade} x R$ {item.precoUnitario.toFixed(2)}</li>
        ))}
      </ul>
      <Typography variant="subtitle1">Total: R$ {pedido.valorTotal.toFixed(2)}</Typography>
      <Typography variant="body1" color="success.main" mt={2}>Seu pedido foi recebido com sucesso!</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>Voltar ao Menu</Button>
    </Box>
  );
};

export default PedidoFinalizado;
