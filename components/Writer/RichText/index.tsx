import React, { useEffect, useState } from "react";
import RichTextEditor from "./RichText";
interface PageSpecsProps {

}
const RichTextEditorBox: React.FC<PageSpecsProps> = ({}) => {
  
  return (
    <>
    {/* <div className="group flex justify-between items-start w-[80%] m-2 mb-4 p-0 rounded-lg border-2 relative"> */}
      {/* <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>Rich Text</div> */}
      <RichTextEditor placeholder="Type your text"/>
    {/* </div> */}
    </>
    
  );
};

export default RichTextEditorBox;
