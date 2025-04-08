
import React, { useEffect, useRef } from 'react';

interface EditorContentProps {
  value: string;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  placeholder?: string;
  isEmpty: boolean;
}

const EditorContent = ({ value, onInput, placeholder = 'Comece a digitar...', isEmpty }: EditorContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Garantir que o conteúdo do editor seja atualizado quando o valor mudar externamente
  useEffect(() => {
    if (contentRef.current && contentRef.current.innerHTML !== value) {
      contentRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="relative min-h-[400px]">
      <div
        ref={contentRef}
        className="editor-content w-full min-h-[400px] p-4 overflow-auto focus:outline-none"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={onInput}
      />
      {isEmpty && (
        <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default EditorContent;
