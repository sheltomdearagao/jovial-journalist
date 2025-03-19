
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Array<'admin' | 'editor' | 'writer'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = ['admin', 'editor', 'writer'] 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Acesso restrito",
        description: "Faça login para acessar esta página.",
        variant: "destructive",
      });
    }
  }, [isLoading, isAuthenticated, toast]);

  // Mostrando um indicador de carregamento enquanto verificamos o status de autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-journal-blue"></div>
      </div>
    );
  }

  // Se não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar se o usuário tem as permissões necessárias
  if (user && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    toast({
      title: "Acesso negado",
      description: "Você não tem permissão para acessar esta página.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado e tiver as permissões necessárias, renderize o conteúdo
  return <>{children}</>;
};

export default ProtectedRoute;
