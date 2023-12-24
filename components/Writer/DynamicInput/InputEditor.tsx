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
    setInputList: any;
    inputList: any;
    el: any;
    index: any;
}

const InputSelector: React.FC<InputSelectorProps> = ({ setInputList, inputList, el, index }) => {
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
        setInputList((prevInputList: any) => {
            const updatedInputs = [...prevInputList];
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
            return updatedInputs;
        });
        handleCloseDialog();
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" onClick={handleOpenDialog}>
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <InputSelectorCard {...{ handleSubmit, handleCloseDialog, type: el.type, textType: el.textType, isEditing: true }} />
            </DialogContent>
        </Dialog>
    );
};

export default InputSelector;