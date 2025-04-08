
import React from 'react';
import { Image, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoverImageUploadProps {
  coverImage: string;
  onImageUpload: () => void;
  onImageRemove: () => void;
}

const CoverImageUpload = ({ coverImage, onImageUpload, onImageRemove }: CoverImageUploadProps) => {
  return (
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
                onClick={onImageUpload}
                className="mr-2"
              >
                <Image className="mr-1 h-4 w-4" />
                Alterar
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={onImageRemove}
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
          onClick={onImageUpload}
        >
          <Image className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-gray-500">Clique para adicionar uma imagem</span>
        </Button>
      )}
    </div>
  );
};

export default CoverImageUpload;
