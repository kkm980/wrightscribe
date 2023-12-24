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
  type?:string;
  textType?:string;
  isEditing?:boolean;
}

const InputSelectorCard: React.FC<InputSelectorCardProps> = ({
  handleSubmit,
  handleCloseDialog,
  type,
  textType,
  isEditing
}) => {
  const [selectedTextValue, setSelectedTextValue] = useState<string>(type||'');
  const [selectedType, setSelectedType] = useState<any>(textType||[]);
  const [availableTextTypes, setAvailableTextTypes] = useState<any>([]);
  const handleSelectChange = (value: string) => {
    setSelectedTextValue(value);
  };
  useEffect(()=>{
    setAvailableTextTypes(textTypeGenerator(selectedTextValue));
  },[selectedTextValue]);

  return (
    <Card className="w-[350px] border-0">
      <CardHeader>
        <CardTitle>{isEditing?"Edit this field":"Create a field"}</CardTitle>
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
                    <SelectItem key={e.value} value={e.value}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* {selectedValue === "text" && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => setSelectedType([...selectedType, value])}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {textTypes.map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label}
                      </SelectItem>
                    ))}
                    
                  </SelectContent>
                </Select>
              </div>
            )} */}
            {selectedTextValue === "text" && (
              <div className="flex flex-col space-y-1.5">
                <CheckboxReactHookFormMultiple {...{availableTextTypes, selectedTextValue, setSelectedType, selectedType}}/>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCloseDialog}>
          Cancel
        </Button>
        <Button onClick={() => isEditing?handleSubmit({type:selectedTextValue, textType:selectedType}):
           handleSubmit({type:selectedTextValue, textType:selectedType, id:`${Math.random()}`})
        }>
        {isEditing?"Done":"Create"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InputSelectorCard;
