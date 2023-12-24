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
  useEffect(()=>{
   console.log(slug,'slug')
  },[slug])
  return (
    <div className="w-[200px] min-h-[100px]" onClick={()=>{onClick()}}>
      <div className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-left">
        <div className={`mb-3 text-2xl font-semibold`}>
          Page specs{' '}
          <span className="inline-block transition-transform group-hover:translate-x-4 motion-reduce:transform-none">
            -&gt;
          </span>
        </div>
        <div className="justify-start items-center hidden group-hover:flex">
          <div className={`m-0 max-w-[30ch] text-sm opacity-50 border-2 p-1 rounded-sm ${supportingLang.length===1?"animate-bounce":""}`}>
            Languages
          </div>
          <div className={`m-0 max-w-[30ch] text-sm opacity-50 border-2 p-1 rounded-sm ${slug.length===0?"animate-bounce":""}`}>
            Slug
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
