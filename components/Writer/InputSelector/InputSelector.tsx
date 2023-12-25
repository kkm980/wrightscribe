import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputSelectorCard from "../InputSelectorCard/InputSelectorCard";
import Ping from "@/components/Common/Ping";

interface InputSelectorProps {
  handleAddInput: any;
  inputList: any;
}

const InputSelector: React.FC<InputSelectorProps> = ({ handleAddInput, inputList }) => {
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
        {/* <div className="relative"> */}
          

          <Button variant="outline" onClick={handleOpenDialog} className="z-10 relative">
            Create field{" "}{inputList.length === 0 ?<div className="ml-1 absolute right-0 -top-1"><Ping/></div>:<></>}
          </Button>
        {/* </div> */}
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <InputSelectorCard {...{ handleSubmit, handleCloseDialog }} />
      </DialogContent>
    </Dialog>
  );
};

export default InputSelector;
