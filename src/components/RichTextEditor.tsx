
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bold, Italic, Underline, List, ListOrdered, Link, Image, 
  AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, 
  Quote, Code, Undo, Redo, FileVideo
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Comece a digitar...' }: RichTextEditorProps) => {
  const [tab, setTab] = useState<string>('editar');
  const [previewHtml, setPreviewHtml] = useState<string>('');

  // Esta é uma implementação simplificada. Em uma aplicação real,
  // você usaria uma biblioteca como Quill, TinyMCE, Draft.js, etc.
  const handleButtonClick = (command: string, value?: string) => {
    // Simulação de implementação - em uma app real, isso seria mais sofisticado
    document.execCommand(command, false, value);

    // Capturar o HTML atual do editor
    const editorContent = document.querySelector('.editor-content');
    if (editorContent) {
      onChange(editorContent.innerHTML);
    }
  };

  const handlePreviewTab = () => {
    setPreviewHtml(value);
    setTab('preview');
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="bg-gray-50 border-b px-3 py-2 flex justify-between items-center">
          <TabsList className="bg-transparent border p-1">
            <TabsTrigger value="editar" className="text-sm">
              Editar
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm" onClick={handlePreviewTab}>
              Visualizar
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editar" className="mt-0">
          <div className="p-2 bg-gray-50 border-b flex flex-wrap gap-1 items-center">
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8" 
              onClick={() => handleButtonClick('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('formatBlock', '<h1>')}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('formatBlock', '<h2>')}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('insertUnorderedList')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('insertOrderedList')}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('formatBlock', '<blockquote>')}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('justifyLeft')}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('justifyCenter')}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('justifyRight')}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => {
                const url = prompt('Insira o URL do link:');
                if (url) handleButtonClick('createLink', url);
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
                if (url) handleButtonClick('insertImage', url);
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
                  // Embed iframe para vídeos
                  const iframe = `<div class="video-container"><iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
                  document.execCommand('insertHTML', false, iframe);
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
              onClick={() => handleButtonClick('undo')}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleButtonClick('redo')}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <div
            className="editor-content min-h-[400px] p-4 overflow-auto focus:outline-none"
            contentEditable
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            placeholder={placeholder}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0 min-h-[400px] p-4 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RichTextEditor;
