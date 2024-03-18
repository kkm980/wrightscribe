import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useTheme } from 'next-themes';
import "./richtext.css";

interface RichTextEditorProps {
  placeholder: string; // Define the type of placeholder
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ placeholder }) => { // Add React.FC for component type
  const editor = useRef<any>(null); // Specify the type of ref
  const { theme, setTheme } = useTheme();
  const [content, setContent] = useState<string>(''); // Specify the type of state
  
  useEffect(()=>{
    console.log("content", content);
  }, [content])
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...', // Correct placeholder text
    }),
    [placeholder]
  );

  const handleBlur = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
    //   tabIndex={1}
      onBlur={handleBlur} // Pass the handleBlur function
      onChange={(newContent: string) => {}} // Define the type of newContent
      className={`${theme==="light"?"text-black":"text-white"} border border-[red] bg-[red] w-[100px]`}
    />
  );
};

export default RichTextEditor; // Export the component
