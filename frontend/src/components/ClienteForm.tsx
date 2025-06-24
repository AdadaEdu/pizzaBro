import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import type { Cliente } from '../types';
import api from '../api';

export default function ClienteForm({ onCadastrado }: { onCadastrado: (cliente: Cliente) => void }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const res = await api.post('/api/clientes', { nome, email, telefone });
      onCadastrado(res.data);
      localStorage.setItem('clienteId', res.data.id);
      localStorage.setItem('clienteNome', res.data.nome);
      localStorage.setItem('clienteEmail', res.data.email);
      localStorage.setItem('clienteTelefone', res.data.telefone);
    } catch {
      setErro('Erro ao cadastrar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2}>Cadastro de Cliente</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nome" value={nome} onChange={e => setNome(e.target.value)} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} fullWidth required sx={{ mb: 2 }} />
        {erro && <Typography color="error" mb={1}>{erro}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </Paper>
  );
}
