
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import CategorySection from '@/components/CategorySection';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockFeaturedArticles = [
  {
    id: '1',
    title: 'Estudantes da Medalha Milagrosa são destaque em Olimpíada de Matemática',
    excerpt: 'Alunos do 9º ano conquistam medalhas na competição estadual e garantem vaga na etapa nacional.',
    coverImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    category: 'Notícias',
    author: 'Equipe Nono Informa',
    date: '15 de maio de 2023'
  },
  {
    id: '2',
    title: 'Novo laboratório de ciências é inaugurado com tecnologia de ponta',
    excerpt: 'Espaço moderno permitirá que alunos realizem experimentos avançados, ampliando o aprendizado prático.',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80',
    category: 'Reportagens',
    author: 'Ana Silva',
    date: '12 de maio de 2023'
  },
  {
    id: '3',
    title: 'Projeto de reciclagem mobiliza comunidade escolar',
    excerpt: 'Iniciativa dos alunos do 7º ano já coletou mais de 200kg de materiais recicláveis em apenas um mês.',
    coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Meio Ambiente',
    author: 'Carlos Santos',
    date: '10 de maio de 2023'
  }
];

const mockNewsArticles = [
  {
    id: '4',
    title: 'Feira Cultural acontecerá no próximo mês',
    excerpt: 'Evento anual vai apresentar trabalhos sobre diversidade cultural brasileira.',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Eventos',
    author: 'Mariana Costa',
    date: '8 de maio de 2023'
  },
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
    id: '6',
    title: 'Novos livros chegam à biblioteca',
    excerpt: 'Acervo recebe mais de 500 novos títulos para todas as idades.',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Notícias',
    author: 'João Silva',
    date: '3 de maio de 2023'
  }
];

const mockEntertainmentArticles = [
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
  },
  {
    id: '9',
    title: 'Festival de música agita o intervalo',
    excerpt: 'Bandas formadas por alunos mostram seu talento durante o recreio.',
    coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Entretenimento',
    author: 'Beatriz Lima',
    date: '25 de abril de 2023'
  }
];

const mockInterviewArticles = [
  {
    id: '10',
    title: 'Entrevista com a nova diretora: "Queremos uma escola mais inclusiva"',
    excerpt: 'Em conversa exclusiva, conhecemos os planos para o próximo ano letivo.',
    coverImage: 'https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Entrevistas',
    author: 'Rafael Moreira',
    date: '20 de abril de 2023'
  },
  {
    id: '11',
    title: 'Ex-aluno que virou cientista fala sobre sua trajetória',
    excerpt: 'Da Medalha Milagrosa para os laboratórios da NASA: uma história inspiradora.',
    coverImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Entrevistas',
    author: 'Camila Rodrigues',
    date: '18 de abril de 2023'
  }
];

const mockCuriosityArticles = [
  {
    id: '12',
    title: 'Por que o céu é azul? A ciência explica',
    excerpt: 'Professora de física responde às perguntas mais frequentes dos alunos.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Curiosidades',
    author: 'Lucas Mendes',
    date: '15 de abril de 2023'
  },
  {
    id: '13',
    title: 'Descobertas arqueológicas em Salvador',
    excerpt: 'Alunos do 8º ano visitam sítio histórico e aprendem sobre a história da cidade.',
    coverImage: 'https://images.unsplash.com/photo-1500049242364-5f500807cdd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    category: 'Curiosidades',
    author: 'Fernanda Lima',
    date: '12 de abril de 2023'
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const heroStyle = {
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-28 pb-16 md:pt-40 md:pb-24 text-white" 
        style={heroStyle}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              Nono <span className="text-journal-yellow">Informa</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 text-white/90 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
              O jornal da Escola Medalha Milagrosa - Salvador
            </p>
            <div className={`flex flex-wrap justify-center gap-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <Button asChild size="lg" className="bg-journal-blue hover:bg-journal-darkBlue">
                <Link to="/noticias">Últimas Notícias</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <a href="#newsletter">Assinar Newsletter</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockFeaturedArticles.map((article, index) => (
              <div key={article.id} className={`${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: `${0.1 * (index + 1)}s`}}>
                <ArticleCard {...article} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="group">
              <Link to="/noticias" className="inline-flex items-center">
                Ver mais matérias
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <CategorySection
        title="Notícias"
        subtitle="Fique por dentro do que acontece na nossa escola"
        articles={mockNewsArticles}
        categoryLink="/noticias"
      />
      
      {/* Interviews Section */}
      <CategorySection
        title="Entrevistas"
        subtitle="Conversas com pessoas inspiradoras da nossa comunidade"
        articles={mockInterviewArticles}
        categoryLink="/entrevistas"
        className="bg-gray-50"
      />
      
      {/* Entertainment Section */}
      <CategorySection
        title="Entretenimento"
        subtitle="Diversão e cultura para todos os gostos"
        articles={mockEntertainmentArticles}
        categoryLink="/entretenimento"
      />
      
      {/* Curiosities Section */}
      <CategorySection
        title="Curiosidades"
        subtitle="Descobertas interessantes do mundo do conhecimento"
        articles={mockCuriosityArticles}
        categoryLink="/curiosidades"
        className="bg-gray-50"
        layout="list"
      />
      
      {/* Newsletter Section */}
      <section id="newsletter" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <NewsletterSubscribe />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Index;
