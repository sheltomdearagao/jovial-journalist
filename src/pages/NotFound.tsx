
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-7xl md:text-9xl font-bold text-journal-blue mb-6">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">
            Ops! Parece que você está procurando uma página que não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-journal-blue hover:bg-journal-darkBlue">
              <Link to="/">Voltar para a página inicial</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Buscar no site
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
