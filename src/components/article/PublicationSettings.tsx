
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PublicationSettingsProps {
  category: string;
  setCategory: (category: string) => void;
  isFeatured: boolean;
  setIsFeatured: (isFeatured: boolean) => void;
  status: string;
  setStatus: (status: string) => void;
  userName?: string;
  categories: string[];
}

const PublicationSettings = ({
  category,
  setCategory,
  isFeatured,
  setIsFeatured,
  status,
  setStatus,
  userName,
  categories
}: PublicationSettingsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Publicação</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="category" className="text-sm font-medium mb-1 block">
            Categoria <span className="text-red-500">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="featured" 
            checked={isFeatured}
            onCheckedChange={(checked) => setIsFeatured(checked as boolean)} 
          />
          <Label htmlFor="featured" className="text-sm font-medium cursor-pointer">
            Destaque na página inicial
          </Label>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Status
          </Label>
          <RadioGroup value={status} onValueChange={setStatus} className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="draft" id="draft" />
              <Label htmlFor="draft" className="text-sm cursor-pointer">Rascunho</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="review" id="review" />
              <Label htmlFor="review" className="text-sm cursor-pointer">Em Revisão</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="published" id="published" />
              <Label htmlFor="published" className="text-sm cursor-pointer">Publicado</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Informações</p>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Criado em: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Última edição: {new Date().toLocaleTimeString()}</span>
            </div>
            {userName && (
              <div className="flex items-center">
                <span className="font-medium">Autor:</span>
                <span className="ml-1">{userName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationSettings;
