import Ping from "@/components/Common/Ping";
import React, { useEffect } from "react";

interface DialogueBoxProps {
  // Add any necessary props here
  onClick: any;
  supportingLang: any;
  setSupportingLang: any;
  slug: any;
  setSlug: any;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({onClick, supportingLang, setSupportingLang, slug, setSlug}) => {

  return (
    <div className="w-[200px] min-h-[100px]" onClick={()=>{onClick()}}>
      <div className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-left">
        <div className={`mb-3 text-2xl font-semibold`}>
          Page specs{' '}
          <span className="inline-block transition-transform group-hover:translate-x-4 motion-reduce:transform-none">
            -&gt;
          </span>
        </div>
        <div className="justify-start items-center flex">
          <div className={`m-0 max-w-[30ch] text-sm opacity-50 p-1 rounded-sm flex`}>
            Languages {supportingLang.length===1?<Ping/>:<></>}
          </div>
          <div className={`m-0 max-w-[30ch] text-sm opacity-50 p-1 rounded-sm flex`}>
            Slug {slug.length===0?<Ping/>:<></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
