import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import CategorySection from '@/components/CategorySection';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, Calendar, ArrowRight, TrendingUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

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

const mockSchoolEvents = [
  {
    id: '20',
    title: 'Semana da Matemática começa na próxima segunda',
    excerpt: 'Série de atividades vai estimular o raciocínio lógico de forma divertida.',
    coverImage: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Eventos',
    author: 'Coordenação Pedagógica',
    date: '18 de maio de 2023'
  },
  {
    id: '21',
    title: 'Novo uniforme é apresentado à comunidade escolar',
    excerpt: 'Design moderno foi escolhido em votação com participação de alunos e professores.',
    coverImage: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Notícias',
    author: 'Direção Escolar',
    date: '14 de maio de 2023'
  },
  {
    id: '22',
    title: 'Campanha de arrecadação de livros bate recorde',
    excerpt: 'Mais de 500 exemplares serão doados para bibliotecas comunitárias.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1128&q=80',
    category: 'Ação Social',
    author: 'Grêmio Estudantil',
    date: '10 de maio de 2023'
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedCuriosity, setExpandedCuriosity] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const isMobile = useIsMobile();

  // Mock curiosity articles expanded with more items for carousel
  const mockCuriosityArticlesExpanded = [
    ...mockCuriosityArticles,
    {
      id: '14',
      title: 'Como funciona a fibra óptica?',
      excerpt: 'Tecnologia que transmite dados através da luz explica aulas de física na prática.',
      coverImage: 'https://images.unsplash.com/photo-1545696648-86c761bc5410?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'Tecnologia',
      author: 'Marcos Santos',
      date: '10 de abril de 2023'
    },
    {
      id: '15',
      title: 'Por que o céu é azul durante o dia e vermelho no pôr do sol?',
      excerpt: 'Fenômeno da dispersão da luz explica mudanças de cores no céu.',
      coverImage: 'https://images.unsplash.com/photo-1500534623283-312aebe2eec3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'Ciência',
      author: 'Julia Costa',
      date: '8 de abril de 2023'
    },
    {
      id: '16',
      title: 'Como são feitos os lápis de cor?',
      excerpt: 'Processo de fabricação dos materiais escolares mais populares entre crianças.',
      coverImage: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'Curiosidades',
      author: 'Renata Lima',
      date: '5 de abril de 2023'
    },
    {
      id: '17',
      title: 'Os animais também sonham?',
      excerpt: 'Descobertas científicas recentes sobre o sono dos animais surpreendem.',
      coverImage: 'https://images.unsplash.com/photo-1517849985205-5e319db3f8ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'Ciência',
      author: 'Paulo Oliveira',
      date: '2 de abril de 2023'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Setup rotation for featured articles
    const featuredInterval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % mockFeaturedArticles.length);
    }, 5000); // Change featured article every 5 seconds
    
    return () => clearInterval(featuredInterval);
  }, []);

  const heroStyle = {
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // Reduced height by an additional 20%
    height: '54vh',  // Previously 68vh, reduced by 20%
    maxHeight: '384px'  // Previously 480px, reduced by 20%
  };

  const toggleCuriosity = (id: string) => {
    if (expandedCuriosity === id) {
      setExpandedCuriosity(null);
    } else {
      setExpandedCuriosity(id);
    }
  };

  // Get the 3 most recent school events (in a real app, this would use actual dates)
  const recentSchoolEvents = mockSchoolEvents.sort((a, b) => {
    // In a real app, you would parse dates and compare them
    // For mock data, we're using the first 3 events as they're already sorted
    return 0;
  }).slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <section 
        className="flex items-center justify-center text-white" 
        style={heroStyle}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`font-bold mb-4 md:mb-6 font-display ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ fontSize: 'calc(3.75rem * 1.15 * 1.15)' }}>
              <span className="text-journal-blue">Nono</span> <span className="text-journal-yellow">Informa</span>
            </h1>
            <p className={`text-lg md:text-2xl text-white/90 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
              O jornal da Escola Medalha Milagrosa
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-8 md:py-12 bg-gradient-to-br from-journal-blue/5 to-journal-lightBlue/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-journal-blue/10 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-journal-blue" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900">Tá rolando na Escola</h2>
            </div>
            <Button variant="ghost" asChild className="text-journal-blue hover:text-journal-darkBlue group">
              <Link to="/eventos" className="flex items-center gap-1">
                Ver tudo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {recentSchoolEvents.map((event, index) => (
              <div key={event.id} 
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 
                ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} 
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
              >
                <div className="h-40 md:h-48 overflow-hidden">
                  <img 
                    src={event.coverImage} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-journal-yellow/10 text-journal-darkBlue text-xs font-medium px-2 py-0.5 rounded-full">
                      {event.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2 hover:text-journal-blue transition-colors">
                    <Link to={`/materia/${event.id}`}>
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">
                    {event.excerpt}
                  </p>
                  <Button asChild variant="ghost" size="sm" className="text-journal-blue hover:bg-journal-blue/10 p-0 h-auto">
                    <Link to={`/materia/${event.id}`} className="flex items-center gap-1">
                      Ler mais <ChevronRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900">Destaques</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-journal-yellow to-journal-lightYellow rounded-full ml-2"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-6 lg:col-span-8">
              {mockFeaturedArticles.length > 0 && (
                <div className={`relative overflow-hidden rounded-xl h-64 md:h-full min-h-[200px] md:min-h-[300px] shadow-lg ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                  <img 
                    src={mockFeaturedArticles[featuredIndex].coverImage} 
                    alt={mockFeaturedArticles[featuredIndex].title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                    <span className="inline-block bg-journal-yellow text-gray-900 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                      {mockFeaturedArticles[featuredIndex].category}
                    </span>
                    <h3 className="text-white font-bold text-lg md:text-2xl mb-2">
                      <Link to={`/materia/${mockFeaturedArticles[featuredIndex].id}`}>
                        {mockFeaturedArticles[featuredIndex].title}
                      </Link>
                    </h3>
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-2 md:mb-4">
                      {mockFeaturedArticles[featuredIndex].excerpt}
                    </p>
                    <div className="flex items-center text-white/70 text-xs md:text-sm">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      <span>{mockFeaturedArticles[featuredIndex].date}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:col-span-6 lg:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
              {mockFeaturedArticles
                .filter((_, index) => index !== featuredIndex)
                .slice(0, 2)
                .map((article, index) => (
                <div key={article.id} 
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 
                  ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} 
                  style={{animationDelay: `${0.1 * (index + 1)}s`}}
                >
                  <div className="flex h-full flex-col">
                    <div className="h-28 md:h-36 overflow-hidden">
                      <img 
                        src={article.coverImage} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-3 md:p-4 flex-1 flex flex-col">
                      <span className="text-xs font-medium text-journal-blue mb-1">
                        {article.category}
                      </span>
                      <h3 className="font-bold text-sm md:text-md mb-1 md:mb-2 line-clamp-2 hover:text-journal-blue transition-colors">
                        <Link to={`/materia/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-gray-500 text-xs md:text-sm">{article.date}</span>
                        <Button asChild variant="ghost" size="sm" className="text-journal-blue hover:bg-journal-blue/10 p-0 h-auto">
                          <Link to={`/materia/${article.id}`} className="flex items-center gap-1 text-xs md:text-sm">
                            Ler <ChevronRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-10">
            <Button asChild variant="outline" className="group">
              <Link to="/noticias" className="inline-flex items-center">
                Ver mais destaques
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <CategorySection
        title="Notícias"
        subtitle="Fique por dentro do que acontece na nossa escola"
        articles={mockNewsArticles}
        categoryLink="/noticias"
        className="bg-gray-50"
        layout={isMobile ? 'list' : 'grid'} 
      />
      
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Entrevistas</h2>
              <p className="text-gray-600 text-sm md:text-base">Conversas com pessoas inspiradoras da nossa comunidade</p>
            </div>
            <Button variant="ghost" asChild className="text-journal-blue hover:text-journal-darkBlue group">
              <Link to="/entrevistas" className="flex items-center">
                Ver todas
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Modified to display 3 interviews per row instead of 2 */}
            {mockInterviewArticles.map((article, index) => (
              <div key={article.id} 
                className={`flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-3 md:p-4 
                ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} 
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
              >
                <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block bg-journal-blue/10 text-journal-blue text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-sm md:text-base mb-2 hover:text-journal-blue transition-colors line-clamp-2">
                      <Link to={`/materia/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-gray-500 text-xs">{article.date}</span>
                    <Button asChild variant="ghost" size="sm" className="text-journal-blue hover:bg-journal-blue/10 p-0 h-auto">
                      <Link to={`/materia/${article.id}`} className="flex items-center gap-1 text-xs">
                        Ler entrevista <ChevronRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CategorySection
        title="Entretenimento"
        subtitle="Diversão e cultura para todos os gostos"
        articles={mockEntertainmentArticles}
        categoryLink="/entretenimento"
        className="bg-gray-50"
        layout={isMobile ? 'list' : 'grid'} 
      />
      
      <section className="py-
