import JoditEditor from "jodit-react";
import { useRef } from "react";

type Props = {
  placeholder?: string;
  content: string;
  setContent: (content: string) => void;
};

export const Editor = ({ placeholder, content, setContent }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const config = {
    readonly: false,
    placeholder: placeholder || "Start typing...",
    height: 350,
  };

  return (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent: string) => setContent(newContent)}
    />
  );
};
