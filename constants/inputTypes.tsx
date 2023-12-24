import { InputTypeOption } from '@/types/inputTypes';

const inputTypes: InputTypeOption[] = [
    { value: "text", label: "Text" },
    { value: "image", label: "Image" },
    { value: "link", label: "Link" },
    { value: "quote", label: "Quote" },
    { value: "Space", label: "Space" },
    { value: "ol", label: "Ordered List", comingSoon: true },
    { value: "ul", label: "Unordered List", comingSoon: true },
    { value: "quiz", label: "Quiz Box", comingSoon: true },
];

export default inputTypes;
  