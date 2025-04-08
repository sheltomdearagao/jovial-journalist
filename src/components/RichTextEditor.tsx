
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
  const [activeTab, setActiveTab] = useState<string>('editar');
  const [editorContent, setEditorContent] = useState(value);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(value === '');
  
  // Sincronizar o estado interno com o valor passado por props
  useEffect(() => {
    if (value !== editorContent) {
      setEditorContent(value);
      setIsEmpty(value === '' || value === '<br>');
    }
  }, [value]);

  // Método para atualizar o conteúdo e propagar as mudanças para o componente pai
  const updateContent = (newContent: string) => {
    setEditorContent(newContent);
    setIsEmpty(newContent === '' || newContent === '<br>');
    onChange(newContent); // Propagar a mudança para o componente pai imediatamente
  };
  
  const handleCommandExecution = (command: string, value?: string) => {
    document.execCommand(command, false, value);

    // Após executar o comando, capturar o conteúdo atualizado
    const editableContent = document.querySelector('.editor-content');
    if (editableContent) {
      updateContent(editableContent.innerHTML);
    }
  };

  const handlePreviewTab = () => {
    setPreviewHtml(editorContent);
    setActiveTab('preview');
  };

  const handleContentChange = (content: string) => {
    updateContent(content);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            onInput={handleContentChange} 
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
