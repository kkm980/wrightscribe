type TextType = "bold" | "italic" | "striken" | "small" | "background" | "cursive";
type QuoteType = "bold" | "italic" | "striken" | "small" | "cursive";
type LinkType = "bold" | "italic" | "small" | "background" | "cursive" | "underlined";

type TextInput = {
  type: "text";
  textType: TextType[];
  text: string;
  id: string;
};

type FileInput = {
    type: "file";
    text: string;
    subTextType: TextType[];
    id: string;
};

type QuoteInput = {
    type: "quote";
    textType: QuoteType[];
    text: string;
    id: string;
};

type LinkInput = {
    type: "link";
    textType: LinkType[];
    href: string;
    text: string;
    id: string;

};

type SpaceInput = {
    type: "space";
    id: string;
};

type BreakInput = {
    type: "break";
    id: string;
};

type OlInput = {
    type: "ol";
    header: string;
    points: TextInput[];
    id: string;
};

type UlInput = {
    type: "ul";
    header: string;
    points: TextInput[];
    id: string;
};

export type Input = TextInput;
// | FileInput | QuoteInput | LinkInput | SpaceInput | BreakInput | OlInput | UlInput