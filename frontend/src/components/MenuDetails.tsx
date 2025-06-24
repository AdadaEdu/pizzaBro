import React from 'react';
import type { Pizza } from '../types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

interface Props {
  item: Pizza;
  onClose: () => void;
}

const MenuDetails: React.FC<Props> = ({ item, onClose }) => (
  <Dialog open onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Detalhes da Pizza</DialogTitle>
    <DialogContent>
      <Typography variant="subtitle1"><b>Sabor:</b> {item.sabor}</Typography>
      <Box mt={2}>
        <Typography variant="subtitle2"><b>Ingredientes:</b></Typography>
        {item.ingredientes && item.ingredientes.length > 0 ? (
          <ul>
            {item.ingredientes.map((ing, idx) => (
              <li key={idx}>{ing.ingrediente} - {ing.quantidade}</li>
            ))}
          </ul>
        ) : <Typography>Nenhum ingrediente cadastrado.</Typography>}
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle2"><b>Cardápio:</b></Typography>
        {item.cardapio && item.cardapio.length > 0 ? (
          <ul>
            {item.cardapio.map((c, idx) => (
              <li key={idx}>{c.tamanho} - R$ {c.valor.toFixed(2)}</li>
            ))}
          </ul>
        ) : <Typography>Nenhum tamanho/valor cadastrado.</Typography>}
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Fechar</Button>
    </DialogActions>
  </Dialog>
);

export default MenuDetails;
