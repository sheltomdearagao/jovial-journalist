
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import ArticleCard from '@/components/ArticleCard';

// Mock data
const mockRelatedArticles = [
  {
    id: '5',
    title: 'Equipe de vôlei feminino é campeã municipal',
    excerpt: 'As meninas superaram escolas tradicionais e trazem o troféu pela primeira vez.',
    coverImage: 'https://images.unsplash.com/photo-1591491634056-276d0295bb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Esportes',
    author: 'Pedro Almeida',
    date: '5 de maio de 2023'
  },
  {
    id: '7',
    title: 'Clube de Teatro prepara peça para o fim do semestre',
    excerpt: 'Os alunos adaptaram um clássico da literatura brasileira para o evento.',
    coverImage: 'https://images.unsplash.com/photo-1598386651573-9232cc0c2d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Entretenimento',
    author: 'Clara Oliveira',
    date: '30 de abril de 2023'
  },
  {
    id: '8',
    title: 'Concurso de poesia revela novos talentos',
    excerpt: 'Estudantes do Ensino Fundamental surpreendem com textos emocionantes.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
    category: 'Cultura',
    author: 'André Santos',
    date: '28 de abril de 2023'
  }
];

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulando carregamento do artigo
    setIsLoading(true);
    setTimeout(() => {
      // Em uma aplicação real, buscaríamos o artigo do banco de dados pelo ID
      setArticle({
        id: '1',
        title: 'Estudantes da Medalha Milagrosa são destaque em Olimpíada de Matemática',
        excerpt: 'Alunos do 9º ano conquistam medalhas na competição estadual e garantem vaga na etapa nacional.',
        content: '<p>Os alunos da Escola Medalha Milagrosa conquistaram resultados expressivos na Olimpíada Estadual de Matemática, realizada no último fim de semana em Salvador.</p><p>A equipe, formada por estudantes do 9º ano, conquistou duas medalhas de ouro, três de prata e cinco menções honrosas, garantindo a melhor colocação da escola na história da competição.</p><p>"É um resultado que reflete o comprometimento dos nossos alunos e o trabalho intenso de preparação que realizamos durante todo o ano", afirmou a professora Maria Santos, coordenadora da equipe olímpica da escola.</p><h2>Preparação intensiva</h2><p>O sucesso não veio por acaso. Os estudantes participaram de um programa especial de preparação, com aulas extras no contraturno e resolução de problemas de olimpíadas anteriores.</p><p>"Estudamos muito, mas o ambiente era sempre descontraído e colaborativo. Aprendemos não apenas conteúdos avançados, mas também estratégias para abordar problemas complexos", contou João Pedro, um dos medalhistas de ouro.</p><p>Com esse resultado, a escola garantiu vaga para a etapa nacional, que acontecerá em novembro, em Brasília.</p>',
        coverImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
        category: 'Notícias',
        author: 'Equipe Nono Informa',
        date: '15 de maio de 2023',
        readTime: '3 min de leitura'
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-journal-blue"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Artigo não encontrado</h1>
            <p className="text-gray-600 mb-6">O artigo que você está procurando não existe ou foi removido.</p>
            <Button asChild className="bg-journal-blue hover:bg-journal-darkBlue">
              <Link to="/">Voltar para a página inicial</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="flex items-center text-gray-600 hover:text-journal-blue">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
        
        {/* Article Header */}
        <article className="mb-12">
          <div className="container mx-auto px-4">
            <Badge className="mb-4 bg-journal-yellow text-gray-800 hover:bg-journal-lightYellow">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] mb-10 relative overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <p className="text-lg text-gray-700 font-medium italic">
                  {article.excerpt}
                </p>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div 
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            {/* Related Articles */}
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leia também</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockRelatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} {...relatedArticle} />
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="max-w-4xl mx-auto mt-16">
              <NewsletterSubscribe />
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleView;
