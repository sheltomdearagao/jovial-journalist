
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'writer';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário no localStorage
    const storedUser = localStorage.getItem('journal_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulação de login - em uma aplicação real, isso seria uma chamada à API
      // Aqui seria a integração com o Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apenas para demonstração:
      if (email === 'professor@escola.com' && password === 'senha123') {
        const user: User = {
          id: '1',
          name: 'Professor Silva',
          email: 'professor@escola.com',
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=Professor+Silva&background=1264AB&color=fff'
        };
        
        setUser(user);
        localStorage.setItem('journal_user', JSON.stringify(user));
        return true;
      } else if (email === 'aluno@escola.com' && password === 'aluno123') {
        const user: User = {
          id: '2',
          name: 'João Aluno',
          email: 'aluno@escola.com',
          role: 'writer',
          avatar: 'https://ui-avatars.com/api/?name=Joao+Aluno&background=1264AB&color=fff'
        };
        
        setUser(user);
        localStorage.setItem('journal_user', JSON.stringify(user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('journal_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
