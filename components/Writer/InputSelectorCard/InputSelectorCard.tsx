import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import inputTypes from "@/constants/inputTypes";
import textTypes from "@/constants/textTypes";
import { CheckboxReactHookFormMultiple } from "./Checkbox";
import textTypeGenerator from "@/utils/textTypeGenerator";

interface InputSelectorCardProps {
  handleSubmit: any;
  handleCloseDialog: () => void;
  el?:any;
  isEditing?: boolean;

}

const InputSelectorCard: React.FC<InputSelectorCardProps> = ({
  handleSubmit,
  handleCloseDialog,
  el,
  isEditing
}) => {
  const [selectedTextValue, setSelectedTextValue] = useState<string>(el?.type || '');
  const [selectedType, setSelectedType] = useState<any>(el?.textType || []);
  // const [selectedType, setSelectedType] = useState<any>(el?.textType || []);
  const [availableTextTypes, setAvailableTextTypes] = useState<any>([]);
  const handleSelectChange = (value: string) => {
    setSelectedTextValue(value);
  };
  useEffect(() => {
    setAvailableTextTypes(textTypeGenerator(selectedTextValue));
  }, [selectedTextValue]);

  const handleClick=()=>{
    const newObj = {type:selectedTextValue, textType:selectedType}
    handleSubmit(newObj);
  }

  return (
    <Card className="w-[350px] border-0">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit this field" : "Create a field"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select value={selectedTextValue} onValueChange={handleSelectChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {inputTypes.map((e) => (
                    <SelectItem
                    key={e.value}
                    value={e.value}
                    disabled={e.comingSoon===true}
                    className={`cursor-${e.comingSoon ? 'not-allowed' : 'pointer'} flex justify-start items-center`}
                    >
                      {e.label}
                      <span className="ml-4 text-rose-300">{e.comingSoon && "coming soon"}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {availableTextTypes.length > 0 && (
              <div className="flex flex-col space-y-1.5">
                <CheckboxReactHookFormMultiple {...{ availableTextTypes, selectedTextValue, setSelectedType, selectedType }} />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCloseDialog}>
          Cancel
        </Button>
        {selectedTextValue.length>0 && 
        <Button onClick={() => {selectedTextValue.length>0 && handleClick()}}
        >
          {isEditing ? "Done" : "Create"}
        </Button>
        }
        
      </CardFooter>
    </Card>
  );
};

export default InputSelectorCard;
