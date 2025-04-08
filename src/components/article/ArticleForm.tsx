
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';

interface ArticleFormProps {
  title: string;
  setTitle: (title: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  authors: string;
  setAuthors: (authors: string) => void;
  content: string;
  setContent: (content: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ArticleForm = ({
  title,
  setTitle,
  excerpt,
  setExcerpt,
  authors,
  setAuthors,
  content,
  setContent,
  onSubmit
}: ArticleFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-base font-medium mb-2 block">
            Título <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da matéria"
            className="text-lg"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="excerpt" className="text-base font-medium mb-2 block">
            Resumo/Subtítulo <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Digite um breve resumo da matéria"
            className="resize-none"
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="authors" className="text-base font-medium mb-2 block">
            Autores <span className="text-red-500">*</span>
          </Label>
          <Input
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder="Digite os nomes dos autores (separados por vírgula)"
            className="text-base"
            required
          />
        </div>
        
        <div>
          <Label className="text-base font-medium mb-2 block">
            Lide e Corpo do texto <span className="text-red-500">*</span>
          </Label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Comece a escrever sua matéria aqui..."
          />
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
