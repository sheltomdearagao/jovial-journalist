
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Save, Upload, Image, Clock, Calendar, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/RichTextEditor';

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Categorias disponíveis
  const categories = [
    'Notícias',
    'Reportagens',
    'Entrevistas',
    'Curiosidades',
    'Entretenimento',
    'Opinião',
    'Esportes',
    'Cultura',
    'Ciência',
    'Tecnologia',
    'Meio Ambiente',
    'Eventos',
  ];
  
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simular carregamento de dados
      setTimeout(() => {
        // Em uma aplicação real, aqui buscaríamos os dados da matéria do banco de dados
        setTitle('Estudantes da Medalha Milagrosa são destaque em Olimpíada de Matemática');
        setExcerpt('Alunos do 9º ano conquistam medalhas na competição estadual e garantem vaga na etapa nacional.');
        setContent('<p>Os alunos da Escola Medalha Milagrosa conquistaram resultados expressivos na Olimpíada Estadual de Matemática, realizada no último fim de semana em Salvador.</p><p>A equipe, formada por estudantes do 9º ano, conquistou duas medalhas de ouro, três de prata e cinco menções honrosas, garantindo a melhor colocação da escola na história da competição.</p><p>"É um resultado que reflete o comprometimento dos nossos alunos e o trabalho intenso de preparação que realizamos durante todo o ano", afirmou a professora Maria Santos, coordenadora da equipe olímpica da escola.</p><h2>Preparação intensiva</h2><p>O sucesso não veio por acaso. Os estudantes participaram de um programa especial de preparação, com aulas extras no contraturno e resolução de problemas de olimpíadas anteriores.</p><p>"Estudamos muito, mas o ambiente era sempre descontraído e colaborativo. Aprendemos não apenas conteúdos avançados, mas também estratégias para abordar problemas complexos", contou João Pedro, um dos medalhistas de ouro.</p><p>Com esse resultado, a escola garantiu vaga para a etapa nacional, que acontecerá em novembro, em Brasília.</p>');
        setCategory('Notícias');
        setCoverImage('https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80');
        setStatus('published');
        setIsLoading(false);
      }, 1000);
    }
  }, [isEditMode]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulando salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: isEditMode ? "Matéria atualizada!" : "Matéria criada!",
        description: isEditMode 
          ? "Suas alterações foram salvas com sucesso." 
          : "Sua matéria foi criada com sucesso.",
      });
      
      // Redirecionar para a dashboard
      navigate('/redacao');
    } catch (error) {
      console.error('Erro ao salvar matéria:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a matéria. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleImageUpload = () => {
    // Em uma aplicação real, aqui abriríamos um input de arquivo e faríamos upload
    const imageUrl = prompt('Por favor, insira a URL da imagem:');
    if (imageUrl) {
      setCoverImage(imageUrl);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-journal-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="mr-2 text-gray-600"
            >
              <Link to="/redacao">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Editar Matéria' : 'Nova Matéria'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="hidden sm:flex"
              onClick={() => navigate('/redacao')}
            >
              Cancelar
            </Button>
            
            <Button 
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-journal-blue hover:bg-journal-darkBlue"
            >
              {isSaving ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-base font-medium mb-2 block">
                    Título <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título da matéria"
                    className="text-lg"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt" className="text-base font-medium mb-2 block">
                    Resumo <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Digite um breve resumo da matéria"
                    className="resize-none"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    Conteúdo <span className="text-red-500">*</span>
                  </Label>
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Comece a escrever sua matéria aqui..."
                  />
                </div>
              </form>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Imagem de capa */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Imagem de Capa</h2>
              
              {coverImage ? (
                <div className="space-y-3">
                  <div className="relative rounded-md overflow-hidden group">
                    <img
                      src={coverImage}
                      alt="Imagem de capa"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={handleImageUpload}
                        className="mr-2"
                      >
                        <Image className="mr-1 h-4 w-4" />
                        Alterar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setCoverImage('')}
                      >
                        <Trash className="mr-1 h-4 w-4" />
                        Remover
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Clique na imagem para alterar ou remover
                  </p>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-40 border-dashed flex flex-col items-center justify-center"
                  onClick={handleImageUpload}
                >
                  <Image className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-gray-500">Clique para adicionar uma imagem</span>
                </Button>
              )}
            </div>
            
            {/* Publicação */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Publicação</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium mb-1 block">
                    Categoria <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Status
                  </Label>
                  <RadioGroup value={status} onValueChange={setStatus} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft" className="text-sm cursor-pointer">Rascunho</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="review" id="review" />
                      <Label htmlFor="review" className="text-sm cursor-pointer">Em Revisão</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="published" id="published" />
                      <Label htmlFor="published" className="text-sm cursor-pointer">Publicado</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Informações</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Criado em: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Última edição: {new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Autor:</span>
                      <span className="ml-1">{user?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
