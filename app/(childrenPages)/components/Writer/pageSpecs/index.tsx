import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeInfo } from 'lucide-react';

import DialogueBox from "./DialogueBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxWrapper from "./Checkbox";
import TooltipBox from "@/components/Common/Tooltip";
import { Badge } from "@/components/ui/badge";
import languages from "@/constants/languageConstants";
import FallBackSelector from "./FallBackSelector";


interface PageSpecsProps {
  // Add any necessary props here
  supportingLang: any;
  setSupportingLang: any;
  slug: any;
  setSlug: any;
  addLangInMultiLangArr: any;
  potentialDeleteLangInMultiLangArr: any;
  defaultLangChoice:any;
  setDefaultLangChoice: any;
}
const PageSpecs: React.FC<PageSpecsProps> = ({defaultLangChoice, setDefaultLangChoice, supportingLang, setSupportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr, slug, setSlug}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
      setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
      setIsDialogOpen(false);
  };

  function getAllLangAddedInMultiLangArr(){
    for(let i=0;i<languages.length;i++){
      addLangInMultiLangArr(languages[i].id);
    }
  }

  function deleteAllLangInMultiLangArr(){
    for(let i=0;i<languages.length;i++){
      languages[i].id != "english" && potentialDeleteLangInMultiLangArr(languages[i].id);
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <DialogueBox onClick={()=>{handleOpenDialog}} setSupportingLang={setSupportingLang} supportingLang={supportingLang} slug={slug} setSlug={setSlug}/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit page credentials</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4 justify-start items-start">
            <div className="w-[100%] flex justify-between items-start p-0">
              <div className="flex flex-col justify-start items-start">
                <Label htmlFor="name" className="text-left mb-2 flex justify-start items-center">
                  Slug :- {" "}
                  <TooltipBox icon={<BadgeInfo size="16px" className="cursor-pointer ml-2" />}
                    tooltipContent={
                      <div>
                        <p>A slug is the name of a page on the website.</p>
                        <p>If you do not name this page, we will do it for you.</p>
                        <p>You can always change it later.</p>
                      </div>
                    }
                  />

                </Label>
                <Input
                  id="slug"
                  placeholder="Write Slug name"
                  className="w-[150px]"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value) }}
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <Label htmlFor="fallback" className="text-left mb-2 flex justify-start items-center">
                  Language Fallback :- {" "}
                  <TooltipBox icon={<BadgeInfo size="16px" className="cursor-pointer ml-2" />}
                    tooltipContent={
                      <div>
                        <p>Unspecified texts for selected languages defaults to fallback values.</p>
                        <p>By default it is english, you can change it anytime.</p>
                      </div>
                    }
                  />

                </Label>
                <FallBackSelector
                  {...{ defaultLangChoice, setDefaultLangChoice }} />
              </div>
              
            </div>
            
            
            <div className="flex flex-col justify-start items-start">
              <div className="flex justify-between items-start w-[100%]">
                <Label htmlFor="name" className="text-left mb-2 flex justify-between items-start">
                  <span className="flex justify-between items-center">
                    Languages :- {" "}
                    <TooltipBox
                      icon={<BadgeInfo size="16px" className="cursor-pointer ml-2" />}
                      tooltipContent={
                        <div>
                          <p>Check all the languages you wish to support in your page.</p>
                          <p>English is default and cannot be unchecked.</p>
                        </div>
                      } />
                  </span>

                </Label>

                <div className="flex">
                  {
                    supportingLang.length !== languages.length 
                    ?
                    <Badge className="mr-3 bg-cyan-800 hover:bg-cyan-600 cursor-pointer"
                    onClick={async () => {
                      await setSupportingLang(languages.map((e) => e.id));
                      await getAllLangAddedInMultiLangArr();
                    }}
                  >
                    Select All
                  </Badge>
                  :
                  <></>
                  }
                  
                  {
                    (supportingLang.length ==1 && supportingLang[0] === "english") ?
                    <></>
                    :
                    <Badge variant="destructive" className="cursor-pointer"
                    onClick={async() => {
                      await setSupportingLang(["english"]);
                      await deleteAllLangInMultiLangArr();
                    }}
                  >
                    Remove All
                  </Badge>
                  }
                  

                </div>
              </div>
              <CheckboxWrapper {...{supportingLang, setSupportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr}}/>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={()=>{handleCloseDialog()}}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageSpecs;
