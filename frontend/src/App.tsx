import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Snackbar, CircularProgress, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent } from '@mui/material';
import MenuList from './components/MenuList';
import MenuForm from './components/MenuForm';
import MenuDetails from './components/MenuDetails';
import ClienteForm from './components/ClienteForm';
import ListaClientes from './components/ListaClientes';
import type { Pizza, Cliente } from './types';
import api from './api';
import { useAuth } from './AuthContext';
import { CartProvider } from './CartContext';
import { Cart } from './components/Cart';
import './App.css';

function App() {
  const { logout } = useAuth();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selected, setSelected] = useState<Pizza | null>(null);
  const [editing, setEditing] = useState<Pizza | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pedidoIniciado, setPedidoIniciado] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [showClienteDialog, setShowClienteDialog] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const res = await api.get('/pizza');
      setPizzas(res.data);
    } catch (e) {
      setError('Erro ao carregar as pizzas');
      setPizzas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleSelect = (item: Pizza) => setSelected(item);
  const handleEdit = (item: Pizza) => {
    setEditing(item);
    setShowForm(true);
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/pizza/${id}`);
      setSuccess('Pizza removida com sucesso');
      fetchPizzas();
    } catch {
      setError('Erro ao remover pizza');
    } finally {
      setLoading(false);
    }
  };
  const handleFormSubmit = async (item: Omit<Pizza, 'id'>, id?: number) => {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/pizza/${id}`, item);
        setSuccess('Pizza atualizada!');
      } else {
        await api.post('/pizza', item);
        setSuccess('Pizza adicionada!');
      }
      setShowForm(false);
      setEditing(null);
      fetchPizzas();
    } catch {
      setError('Erro ao salvar pizza');
    } finally {
      setLoading(false);
    }
  };

  // Sempre exibe o cardápio, com botões no topo
  return (
    <>
      <Box display="flex" justifyContent="center" gap={2} mt={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => setShowClienteDialog(true)}>
          Iniciar Pedido
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setShowClienteForm(true)}>
          Cadastrar Cliente
        </Button>
      </Box>
      <Dialog open={showClienteDialog} onClose={() => setShowClienteDialog(false)}>
        <DialogTitle>Selecione o Cliente</DialogTitle>
        <DialogContent>
          <ListaClientes onSelecionar={c => { setClienteSelecionado(c); setShowClienteDialog(false); setPedidoIniciado(true); }} />
        </DialogContent>
      </Dialog>
      <Dialog open={showClienteForm} onClose={() => setShowClienteForm(false)}>
        <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
        <DialogContent>
          <ClienteForm onCadastrado={c => setShowClienteForm(false)} />
        </DialogContent>
      </Dialog>
      {/* Cardápio e carrinho só aparecem se pedido iniciado */}
      {pedidoIniciado && clienteSelecionado && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
            <img src="/pizza.png" alt="Pizza" style={{ height: 110, filter: 'drop-shadow(0 4px 16px #b22222)' }} />
            <span style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#fffbe7',
              textShadow: '2px 2px 8px #b22222, 0 0 10px #000',
              letterSpacing: 2,
              fontFamily: 'Pacifico, Segoe UI, Arial, sans-serif',
              marginTop: 8
            }}>
              Pizzaria Brother's
            </span>
          </div>
          <AppBar position="static" sx={{ borderRadius: 2, mb: 2, background: '#7c2f13' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, color: '#fffbe7', fontWeight: 700 }}>
                Cardápio de Pizzas
              </Typography>
              <Button color="inherit" sx={{ color: '#ffe0b2', fontWeight: 700 }} onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4, minHeight: '80vh' }}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => { setShowForm(true); setEditing(null); }}>Adicionar Pizza</Button>
            {loading && <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>}
            <MenuList pizzas={pizzas} onSelect={handleSelect} onEdit={handleEdit} onDelete={handleDelete} pedidoIniciado={pedidoIniciado} />
            {selected && <MenuDetails item={selected} onClose={() => setSelected(null)} />}
            {showForm && <MenuForm item={editing} onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />}
            <Cart cliente={clienteSelecionado} onNovoPedido={() => { setPedidoIniciado(false); setClienteSelecionado(null); }} />
          </Container>
        </>
      )}
      {/* Cardápio puro (sem carrinho) se não iniciou pedido */}
      {!pedidoIniciado && (
        <MenuList pizzas={pizzas} onSelect={handleSelect} onEdit={handleEdit} onDelete={handleDelete} pedidoIniciado={pedidoIniciado} />
      )}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')} message={error} />
      <Snackbar open={!!success} autoHideDuration={4000} onClose={() => setSuccess('')} message={success} />
    </>
  );
}

export default App;
