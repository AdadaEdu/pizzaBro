import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Limpa token ao iniciar a aplicação
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Usa a URL absoluta do backend para login
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      setUser(username);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw new Error("Usuário ou senha inválidos");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
