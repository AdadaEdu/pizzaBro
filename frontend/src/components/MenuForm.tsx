import React, { useState } from 'react';
import type { Pizza, Ingrediente, Cardapio } from '../types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  item?: Pizza | null;
  onSubmit: (item: Omit<Pizza, 'id'>, id?: number) => void;
  onClose: () => void;
}

const emptyIngrediente: Ingrediente = { id: 0, ingrediente: '', quantidade: '' };
const emptyCardapio: Cardapio = { id: 0, valor: 0, tamanho: '' };

const MenuForm: React.FC<Props> = ({ item, onSubmit, onClose }) => {
  const [sabor, setSabor] = useState(item?.sabor || '');
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(item?.ingredientes || [ { ...emptyIngrediente } ]);
  const [cardapio, setCardapio] = useState<Cardapio[]>(item?.cardapio || [ { ...emptyCardapio } ]);

  const handleIngredienteChange = (idx: number, field: keyof Ingrediente, value: string) => {
    setIngredientes(ingredientes.map((ing, i) => i === idx ? { ...ing, [field]: value } : ing));
  };
  const handleAddIngrediente = () => setIngredientes([...ingredientes, { ...emptyIngrediente }]);
  const handleRemoveIngrediente = (idx: number) => setIngredientes(ingredientes.filter((_, i) => i !== idx));

  const handleCardapioChange = (idx: number, field: keyof Cardapio, value: string | number) => {
    setCardapio(cardapio.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };
  const handleAddCardapio = () => setCardapio([...cardapio, { ...emptyCardapio }]);
  const handleRemoveCardapio = (idx: number) => setCardapio(cardapio.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sabor) return;
    // Garante que ingredientes e cardapio sejam arrays
    const ingredientesArr = Array.isArray(ingredientes) ? ingredientes : [];
    const cardapioArr = Array.isArray(cardapio) ? cardapio : [];
    onSubmit({ sabor, ingredientes: ingredientesArr, cardapio: cardapioArr }, item?.id);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{item ? 'Editar Pizza' : 'Nova Pizza'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Sabor" value={sabor} onChange={e => setSabor(e.target.value)} required />
            <Typography variant="subtitle1">Ingredientes</Typography>
            {ingredientes.map((ing, idx) => (
              <Box key={idx} display="flex" gap={1} alignItems="center">
                <TextField label="Ingrediente" value={ing.ingrediente} onChange={e => handleIngredienteChange(idx, 'ingrediente', e.target.value)} required sx={{ flex: 1 }} />
                <TextField label="Quantidade" value={ing.quantidade} onChange={e => handleIngredienteChange(idx, 'quantidade', e.target.value)} required sx={{ flex: 1 }} />
                <IconButton onClick={() => handleRemoveIngrediente(idx)} disabled={ingredientes.length === 1}><DeleteIcon /></IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={handleAddIngrediente} sx={{ alignSelf: 'flex-start' }}>Adicionar Ingrediente</Button>
            <Typography variant="subtitle1">Cardápio</Typography>
            {cardapio.map((c, idx) => (
              <Box key={idx} display="flex" gap={1} alignItems="center">
                <TextField label="Tamanho" value={c.tamanho} onChange={e => handleCardapioChange(idx, 'tamanho', e.target.value)} required sx={{ flex: 1 }} />
                <TextField label="Valor" type="number" value={c.valor} onChange={e => handleCardapioChange(idx, 'valor', parseFloat(e.target.value))} required sx={{ flex: 1 }} inputProps={{ step: '0.01', min: 0 }} />
                <IconButton onClick={() => handleRemoveCardapio(idx)} disabled={cardapio.length === 1}><DeleteIcon /></IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={handleAddCardapio} sx={{ alignSelf: 'flex-start' }}>Adicionar Tamanho/Valor</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MenuForm;
