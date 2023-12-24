import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DialogueBox from "./DialogueBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxWrapper from "./Checkbox";

const PageSpecs: React.FC = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <DialogueBox />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit page credentials</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4 justify-start items-start">
            <div className="flex flex-col justify-start items-start">
              <Label htmlFor="name" className="text-left mb-2">
                Slug :-
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <Label htmlFor="username" className="text-left mb-2">
                Languages :-
              </Label>
              <CheckboxWrapper />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageSpecs;
