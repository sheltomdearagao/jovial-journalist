
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditorControls from './editor/EditorControls';
import EditorContent from './editor/EditorContent';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Comece a digitar...' }: RichTextEditorProps) => {
  const [tab, setTab] = useState<string>('editar');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(value === '');
  const [editorContent, setEditorContent] = useState(value);
  
  // Sincronizar o estado interno com o valor passado por props
  useEffect(() => {
    setEditorContent(value);
    setIsEmpty(value === '');
  }, [value]);

  useEffect(() => {
    // Atualizar o valor externo apenas quando o conteúdo interno mudar
    // e for diferente do valor atual
    if (editorContent !== value) {
      onChange(editorContent);
    }
  }, [editorContent, onChange, value]);
  
  const handleCommandExecution = (command: string, value?: string) => {
    document.execCommand(command, false, value);

    const editableContent = document.querySelector('.editor-content');
    if (editableContent) {
      setEditorContent(editableContent.innerHTML);
    }
  };

  const handlePreviewTab = () => {
    setPreviewHtml(editorContent);
    setTab('preview');
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    setEditorContent(content);
    setIsEmpty(content === '' || content === '<br>');
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
          <EditorControls onCommand={handleCommandExecution} />
          <EditorContent 
            value={editorContent} 
            onInput={handleInput} 
            placeholder={placeholder}
            isEmpty={isEmpty}
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
