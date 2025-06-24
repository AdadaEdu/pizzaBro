import React, { useContext } from 'react';
import type { Pizza } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CartContext } from '../CartContext';

interface Props {
  pizzas: Pizza[];
  onSelect: (item: Pizza) => void;
  onEdit: (item: Pizza) => void;
  onDelete: (id: number) => void;
  pedidoIniciado?: boolean;
}

const MenuList: React.FC<Props> = ({ pizzas, onSelect, onEdit, onDelete, pedidoIniciado }) => {
  const cart = useContext(CartContext);
  if (!cart) return null;
  const { adicionarItem } = cart;

  // Adiciona ao carrinho o sabor e o tamanho escolhido
  const handleAddToCart = (pizza: Pizza, cardapioId: number) => {
    const cardapio = pizza.cardapio.find(c => c.id === cardapioId);
    if (!cardapio) return;
    adicionarItem({
      nomePizza: pizza.sabor + ' (' + cardapio.tamanho + ')',
      quantidade: 1,
      precoUnitario: cardapio.valor
    });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sabor</TableCell>
            <TableCell>Ingredientes</TableCell>
            <TableCell>Cardápio</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sabor}</TableCell>
              <TableCell>
                {item.ingredientes && item.ingredientes.length > 0
                  ? item.ingredientes.map(ing => `${ing.ingrediente} (${ing.quantidade})`).join(', ')
                  : '---'}
              </TableCell>
              <TableCell>
                {item.cardapio && item.cardapio.length > 0
                  ? item.cardapio.map(c => (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {c.tamanho}: R$ {c.valor.toFixed(2)}
                        {pedidoIniciado && (
                          <Button size="small" variant="outlined" color="success" onClick={() => handleAddToCart(item, c.id)}>
                            Adicionar ao Carrinho
                          </Button>
                        )}
                      </div>
                    ))
                  : '---'}
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onSelect(item)}><VisibilityIcon /></IconButton>
                <IconButton color="secondary" onClick={() => onEdit(item)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => onDelete(item.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuList;
