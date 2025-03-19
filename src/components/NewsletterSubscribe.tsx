
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Mail } from 'lucide-react';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um endereço de e-mail válido.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Aqui seria a integração com o Supabase
      // Simulando um delay para demonstração
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Obrigado por se inscrever na nossa newsletter.",
      });
      
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro ao se inscrever",
        description: "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-journal-blue to-journal-lightBlue rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col items-center text-center">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-4">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Fique sempre por dentro
        </h3>
        <p className="text-white/80 mb-6 max-w-md">
          Inscreva-se na nossa newsletter e receba as últimas notícias e atualizações do Nono Informa.
        </p>
        
        <form onSubmit={handleSubscribe} className="w-full max-w-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow border-none bg-white/90 placeholder:text-gray-500 text-gray-900"
              disabled={loading || success}
            />
            <Button 
              type="submit" 
              disabled={loading || success} 
              className="bg-journal-yellow hover:bg-journal-lightYellow text-gray-900 font-medium transition-all"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : success ? (
                <CheckCircle className="mr-2 h-4 w-4" />
              ) : null}
              {loading ? "Enviando..." : success ? "Inscrito!" : "Fique sempre por dentro"}
            </Button>
          </div>
        </form>
        
        <p className="text-white/70 text-sm mt-4">
          Prometemos não enviar spam. Você pode cancelar a qualquer momento.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
