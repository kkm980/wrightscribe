type TextType = "bold" | "italic" | "striken" | "small" | "background" | "cursive";
type QuoteType = "bold" | "italic" | "striken" | "small" | "cursive";
type LinkType = "bold" | "italic" | "small" | "background" | "cursive" | "underlined";

type TextInput = {
  type: "text";
  textType: TextType[];
  text: string;
  id: string;
  show?: boolean;
};

type FileInput = {
    type: "image";
    text: string;
    textType: TextType[];
    id: string;
    show?: boolean;
};

type QuoteInput = {
    type: "quote";
    textType: QuoteType[];
    text: string;
    id: string;
    show?: boolean;
};

type LinkInput = {
    type: "link";
    textType: LinkType[];
    href: string;
    text: string;
    id: string;
    show?: boolean;

};

type SpaceInput = {
    type: "space";
    id: string;
    show?: boolean;
};

type BreakInput = {
    type: "break";
    id: string;
    show?: boolean;
};

type OlInput = {
    type: "ol";
    header: string;
    points: TextInput[];
    id: string;
    show?: boolean;
};

type UlInput = {
    type: "ul";
    header: string;
    points: TextInput[];
    id: string;
    show?: boolean;
};

export type Input = TextInput | LinkInput | QuoteInput | FileInput;
// | FileInput | QuoteInput | LinkInput | SpaceInput | BreakInput | OlInput | UlInput