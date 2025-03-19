
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Reportagens', path: '/reportagens' },
    { name: 'Entrevistas', path: '/entrevistas' },
    { name: 'Curiosidades', path: '/curiosidades' },
    { name: 'Entretenimento', path: '/entretenimento' },
    { name: 'Opinião', path: '/opiniao' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/70 backdrop-blur-md shadow-md py-2' 
          : 'bg-white/70 backdrop-blur-md py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <span className="font-display font-bold text-2xl md:text-3xl">
              <span className="text-journal-blue">Nono</span> <span className="text-journal-yellow">Informa</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    location.pathname === link.path
                      ? 'text-journal-blue font-semibold'
                      : 'text-gray-600 hover:text-journal-blue'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            {searchOpen ? (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-40 md:w-64 pr-8"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="text-gray-600" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-journal-blue" />
              ) : (
                <Menu className="h-6 w-6 text-journal-blue" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-3 rounded-md font-medium transition-colors',
                location.pathname === link.path
                  ? 'bg-journal-blue/10 text-journal-blue font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="relative mt-4">
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pr-8"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
