
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-journal-darkBlue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Sobre o jornal */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">Nono Informa</h3>
            <p className="text-gray-300 mb-4">
              O jornal escolar da Escola Medalha Milagrosa. Produzido por alunos e professores para informar, entreter e inspirar nossa comunidade.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-journal-yellow transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-journal-yellow transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-journal-yellow transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-journal-yellow transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Seções */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">Seções</h3>
            <ul className="space-y-2">
              <li><Link to="/noticias" className="text-gray-300 hover:text-white transition-colors">Notícias</Link></li>
              <li><Link to="/reportagens" className="text-gray-300 hover:text-white transition-colors">Reportagens</Link></li>
              <li><Link to="/entrevistas" className="text-gray-300 hover:text-white transition-colors">Entrevistas</Link></li>
              <li><Link to="/curiosidades" className="text-gray-300 hover:text-white transition-colors">Curiosidades</Link></li>
              <li><Link to="/entretenimento" className="text-gray-300 hover:text-white transition-colors">Entretenimento</Link></li>
              <li><Link to="/opiniao" className="text-gray-300 hover:text-white transition-colors">Artigos de Opinião</Link></li>
            </ul>
          </div>
          
          {/* Links Úteis */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/equipe" className="text-gray-300 hover:text-white transition-colors">Nossa Equipe</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/privacidade" className="text-gray-300 hover:text-white transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-journal-yellow shrink-0 mt-0.5" />
                <span className="text-gray-300">Escola Medalha Milagrosa<br/>Salvador, Bahia</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-journal-yellow" />
                <a href="mailto:contato@nonoinforma.com.br" className="text-gray-300 hover:text-white transition-colors">
                  contato@nonoinforma.com.br
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-journal-yellow" />
                <a href="tel:+557132123456" className="text-gray-300 hover:text-white transition-colors">
                  (71) 3212-3456
                </a>
              </li>
              <li className="flex items-center mt-4">
                <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link to="/login" className="flex items-center justify-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Área Restrita
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Linha divisória */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Nono Informa - Escola Medalha Milagrosa. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Desenvolvido com 💙 pelos alunos da Escola Medalha Milagrosa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
