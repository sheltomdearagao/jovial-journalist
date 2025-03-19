
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, FileText, Users, Settings, LogOut, 
  Bell, Search, Mail, ChevronDown, Menu, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data para artigos
const mockArticles = [
  {
    id: '1',
    title: 'Estudantes da Medalha Milagrosa são destaque em Olimpíada de Matemática',
    excerpt: 'Alunos do 9º ano conquistam medalhas na competição estadual e garantem vaga na etapa nacional.',
    status: 'published',
    author: 'Equipe Nono Informa',
    category: 'Notícias',
    date: '15/05/2023',
  },
  {
    id: '2',
    title: 'Novo laboratório de ciências é inaugurado com tecnologia de ponta',
    status: 'draft',
    author: 'Ana Silva',
    category: 'Reportagens',
    date: '12/05/2023',
  },
  {
    id: '3',
    title: 'Projeto de reciclagem mobiliza comunidade escolar',
    status: 'review',
    author: 'Carlos Santos',
    category: 'Meio Ambiente',
    date: '10/05/2023',
  },
  {
    id: '4',
    title: 'Feira Cultural acontecerá no próximo mês',
    status: 'published',
    author: 'Mariana Costa',
    category: 'Eventos',
    date: '08/05/2023',
  },
  {
    id: '5',
    title: 'Equipe de vôlei feminino é campeã municipal',
    status: 'published',
    author: 'Pedro Almeida',
    category: 'Esportes',
    date: '05/05/2023',
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [articles, setArticles] = useState(mockArticles);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fechar sidebar em mobile ao montar o componente
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'review':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Rascunho';
      case 'review':
        return 'Em revisão';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 w-64 transition-all duration-300 fixed inset-y-0 z-30 ${
          sidebarOpen ? 'left-0' : '-left-64'
        } md:left-0 md:static flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-center">
          <Link to="/redacao" className="text-xl font-bold text-journal-blue">
            Nono <span className="text-journal-yellow">Informa</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          <Link
            to="/redacao"
            className="flex items-center px-3 py-2 text-gray-800 rounded-md bg-gray-100 font-medium"
          >
            <FileText className="mr-3 h-5 w-5 text-gray-600" />
            Matérias
          </Link>
          
          <Link
            to="/redacao/nova-materia"
            className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            <PlusCircle className="mr-3 h-5 w-5" />
            Nova Matéria
          </Link>
          
          {user?.role === 'admin' && (
            <Link
              to="/redacao/usuarios"
              className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Users className="mr-3 h-5 w-5" />
              Usuários
            </Link>
          )}
          
          <Link
            to="/redacao/configuracoes"
            className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Settings className="mr-3 h-5 w-5" />
            Configurações
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar matérias..."
                  className="pl-9 w-full md:w-80"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Mail className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" asChild className="text-gray-600" size="sm">
                <Link to="/">
                  <Home className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Ir para o site</span>
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1264AB&color=fff`}
                      alt={user?.name || 'Usuário'}
                      className="h-8 w-8 rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-grow p-6">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Matérias
              </h1>
              <p className="text-gray-600">
                Gerencie o conteúdo do jornal escolar
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-journal-blue hover:bg-journal-darkBlue' : ''}
                size="sm"
              >
                Todas
              </Button>
              <Button
                variant={filter === 'published' ? 'default' : 'outline'}
                onClick={() => setFilter('published')}
                className={filter === 'published' ? 'bg-green-600 hover:bg-green-700' : ''}
                size="sm"
              >
                Publicadas
              </Button>
              <Button
                variant={filter === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilter('draft')}
                className={filter === 'draft' ? 'bg-gray-600 hover:bg-gray-700' : ''}
                size="sm"
              >
                Rascunhos
              </Button>
              <Button
                variant={filter === 'review' ? 'default' : 'outline'}
                onClick={() => setFilter('review')}
                className={filter === 'review' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                size="sm"
              >
                Em Revisão
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Autor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Link 
                          to={`/redacao/editar-materia/${article.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-journal-blue"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{article.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{article.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{article.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusText(article.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Ações <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to={`/redacao/editar-materia/${article.id}`} className="w-full">
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/materia/${article.id}`} className="w-full">
                                Visualizar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredArticles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma matéria encontrada</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
