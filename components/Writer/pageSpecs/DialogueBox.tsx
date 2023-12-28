import Ping from "@/components/Common/Ping";
import { Check } from 'lucide-react';
import React, { useEffect } from "react";

interface DialogueBoxProps {
  // Add any necessary props here
  onClick: any;
  supportingLang: any;
  setSupportingLang: any;
  slug: any;
  setSlug: any;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ onClick, supportingLang, slug, setSlug }) => {

  return (
    <div className="w-[200px] min-h-[100px]" onClick={() => { onClick() }}>
      <div className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-left">
        <div className={`mb-3 text-2xl font-semibold`}>
          Page specs{' '}
          <span className="inline-block transition-transform group-hover:translate-x-4 motion-reduce:transform-none">
            -&gt;
          </span>
        </div>
        <div className="justify-between items-center flex">
          <div className={`m-0 max-w-[30ch] text-sm opacity-50 p-1 rounded-sm flex relative`}>
            Languages {supportingLang.length === 1 ? <Ping /> : <></>}
            {supportingLang.length > 1 && <div className="border-2 border-[grey] rounded-full p-[1px] text-[10px] text-black dark:text-teal-500 text-semibold w-[20px] h-[20px] justify-center items-center absolute -top-1 -right-2 hidden group-hover:flex">{supportingLang.length}</div>}
          </div>
          <div className={`m-0 mr-4 max-w-[30ch] text-sm opacity-50 p-1 rounded-sm flex relative`}>
            Slug {slug.length === 0 ? <Ping /> : <></>}
            {slug.length > 0 && <div className="border-1 border-[grey] rounded-full p-[0px] text-[5px] text-black dark:text-teal-500 text-semibold w-[20px] h-[20px] justify-center items-center absolute top-1 -right-4 hidden group-hover:flex"><Check /></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
