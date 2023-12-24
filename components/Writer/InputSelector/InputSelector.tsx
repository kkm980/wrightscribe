import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputSelectorCard from "../InputSelectorCard/InputSelectorCard";

interface InputSelectorProps {
  handleAddInput: any;
}

const InputSelector: React.FC<InputSelectorProps> = ({ handleAddInput }) => {
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
    handleAddInput(obj);
    handleCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleOpenDialog}>
          Create field
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <InputSelectorCard {...{ handleSubmit, handleCloseDialog }} />
      </DialogContent>
    </Dialog>
  );
};

export default InputSelector;
