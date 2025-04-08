
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, Italic, Underline, List, ListOrdered, Link, Image, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Heading1, Heading2, 
  Quote, Undo, Redo, FileVideo
} from 'lucide-react';

interface EditorControlsProps {
  onCommand: (command: string, value?: string) => void;
}

const EditorControls = ({ onCommand }: EditorControlsProps) => {
  return (
    <div className="p-2 bg-gray-50 border-b flex flex-wrap gap-1 items-center">
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8" 
        onClick={() => onCommand('bold')}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('italic')}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('underline')}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('formatBlock', '<h1>')}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('formatBlock', '<h2>')}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('insertUnorderedList')}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('insertOrderedList')}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('formatBlock', '<blockquote>')}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('justifyLeft')}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('justifyCenter')}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('justifyRight')}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('justifyFull')}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => {
          const url = prompt('Insira o URL do link:');
          if (url) onCommand('createLink', url);
        }}
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => {
          const url = prompt('Insira o URL da imagem:');
          if (url) onCommand('insertImage', url);
        }}
      >
        <Image className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => {
          const url = prompt('Insira o URL do vídeo (YouTube, Vimeo):');
          if (url) {
            const iframe = `<div class="video-container"><iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
            onCommand('insertHTML', iframe);
          }
        }}
      >
        <FileVideo className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('undo')}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8"
        onClick={() => onCommand('redo')}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EditorControls;
