
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Componentes refatorados
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleForm from '@/components/article/ArticleForm';
import CoverImageUpload from '@/components/article/CoverImageUpload';
import PublicationSettings from '@/components/article/PublicationSettings';

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
  const [isFeatured, setIsFeatured] = useState(false);
  const [authors, setAuthors] = useState('');
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
        setIsFeatured(true);
        setAuthors('Maria Silva, João Santos');
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
      <ArticleHeader 
        isEditMode={isEditMode}
        isSaving={isSaving}
        onSave={handleSubmit}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            <ArticleForm 
              title={title}
              setTitle={setTitle}
              excerpt={excerpt}
              setExcerpt={setExcerpt}
              authors={authors}
              setAuthors={setAuthors}
              content={content}
              setContent={setContent}
              onSubmit={handleSubmit}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Imagem de capa */}
            <CoverImageUpload 
              coverImage={coverImage}
              onImageUpload={handleImageUpload}
              onImageRemove={() => setCoverImage('')}
            />
            
            {/* Publicação */}
            <PublicationSettings 
              category={category}
              setCategory={setCategory}
              isFeatured={isFeatured}
              setIsFeatured={setIsFeatured}
              status={status}
              setStatus={setStatus}
              userName={user?.name}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
