import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import PedidoFinalizado from './PedidoFinalizado';
import { CartProvider } from './CartContext';
import Login from './components/Login';
import { useAuth } from './AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

const Router: React.FC = () => (
  <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/pedido-finalizado" element={<PrivateRoute><PedidoFinalizado /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </CartProvider>
  </BrowserRouter>
);

export default Router;
