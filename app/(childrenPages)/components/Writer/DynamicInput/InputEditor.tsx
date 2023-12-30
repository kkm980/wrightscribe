import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import InputSelectorCard from "../InputSelectorCard/InputSelectorCard";
import { Settings } from "lucide-react";

interface InputSelectorProps {
    setMultiLangInputList: any;
    multiLangInputList: any;
    el: any;
    index: any;
}

const InputSelector: React.FC<InputSelectorProps> = ({ setMultiLangInputList, multiLangInputList, el, index }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmit = (obj:any) => {
        // Handle the form submission logic here
        // ...
        // Close the dialog after submitting
        setMultiLangInputList((prevMultipleLangInputList: any) => {
            const updatedInputs = [...prevMultipleLangInputList];
            if (

                updatedInputs[index].type === "text" &&
                obj.type === "text"
            ) {
                // Create a new object to update the specific input
                updatedInputs[index] = { ...updatedInputs[index], value: updatedInputs[index].value };
            } else {
                updatedInputs[index] = { ...updatedInputs[index], value: "" };
            }
            updatedInputs[index].textType = obj.textType;
            updatedInputs[index].type = obj.type;
            let anArr=updatedInputs[index].multiLangText;
            anArr = anArr.map((langObj: any) => ({
                ...langObj,
                textType:obj.textType,
                type:obj.type
            }));
            updatedInputs[index].multiLangText=anArr;
            return updatedInputs;
        });
        handleCloseDialog();
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="p-1" onClick={handleOpenDialog}>
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <InputSelectorCard {...{ handleSubmit, handleCloseDialog, el, isEditing: true }} />
            </DialogContent>
        </Dialog>
    );
};

export default InputSelector;