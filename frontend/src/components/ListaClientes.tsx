import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import type { Cliente } from '../types';
import api from '../api';

export default function ListaClientes({ onSelecionar }: { onSelecionar: (cliente: Cliente) => void }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/api/clientes').then(res => setClientes(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" mb={2}>Clientes Cadastrados</Typography>
      {loading ? <CircularProgress /> : (
        <List>
          {clientes.map(cliente => (
            <ListItem button key={cliente.id} onClick={() => onSelecionar(cliente)}>
              <ListItemText primary={cliente.nome} secondary={cliente.email + ' | ' + cliente.telefone} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
