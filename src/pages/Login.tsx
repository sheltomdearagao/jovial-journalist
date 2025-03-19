
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Se o usuário estava tentando acessar uma página protegida, 
  // redirecionamos ele para lá após o login
  const from = location.state?.from?.pathname || '/redacao';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Portal da Redação.",
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Erro ao fazer login",
          description: "E-mail ou senha incorretos.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com link para voltar */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-journal-blue hover:text-journal-darkBlue transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-journal-blue mb-2">Portal da Redação</h1>
            <h2 className="text-2xl font-bold">Nono <span className="text-journal-yellow">Informa</span></h2>
            <p className="mt-2 text-gray-600">
              Acesse sua conta para gerenciar as matérias do jornal
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mt-8 border border-gray-200">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  placeholder="seu.email@escola.com"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <a href="#" className="text-sm text-journal-blue hover:text-journal-darkBlue">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-journal-blue hover:bg-journal-darkBlue"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Credenciais para teste:</p>
              <div className="mt-2 text-xs bg-gray-100 p-2 rounded-md text-left">
                <p><strong>Professor:</strong> professor@escola.com / senha123</p>
                <p><strong>Aluno:</strong> aluno@escola.com / aluno123</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
