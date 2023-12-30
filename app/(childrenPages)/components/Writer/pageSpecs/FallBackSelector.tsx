import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import langChoiceTypes from "@/constants/langChoiceTypes";

interface FallBackSelectorProps {
    defaultLangChoice: any;
    setDefaultLangChoice: any;
}

const FallBackSelector: React.FC<FallBackSelectorProps> = ({defaultLangChoice, setDefaultLangChoice}) => {
  return (
    <Select
      defaultValue="English"
      value={defaultLangChoice}
      onValueChange={setDefaultLangChoice}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fallback" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectLabel>Fallback</SelectLabel>
            {langChoiceTypes.map((e:any)=>(
              <SelectItem value={e.value}>{e.id}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export default FallBackSelector;
