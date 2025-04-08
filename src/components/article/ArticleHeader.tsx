
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleHeaderProps {
  isEditMode: boolean;
  isSaving: boolean;
  onSave: () => void;
}

const ArticleHeader = ({ isEditMode, isSaving, onSave }: ArticleHeaderProps) => {
  return (
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
            asChild
          >
            <Link to="/redacao">Cancelar</Link>
          </Button>
          
          <Button 
            onClick={onSave}
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
  );
};

export default ArticleHeader;
