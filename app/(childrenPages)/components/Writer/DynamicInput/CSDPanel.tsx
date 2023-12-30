import { Button } from "@/components/ui/button";
import { BookCopy } from "lucide-react";
import InputDeleter from "./InputDeleter";
import InputEditor from "./InputEditor";


interface CSDPanel {
    multiLangInputList: any;
    setMultiLangInputList: any;
    el: any;
    index: any;
    parentDataObj?:any;
  }
const CSDPanel: React.FC<CSDPanel> = ({parentDataObj, setMultiLangInputList, multiLangInputList, el, index}) => {
    return(
        <div className='w-[120px] cursor-pointer sticky top-[50%] right-0'>
        <Button variant="ghost"
          className='p-1'
          onClick={() => {
            setMultiLangInputList((prevMultiLangInputList: any) => {
              const updatedInputs = [...prevMultiLangInputList];
              updatedInputs.push({ ...parentDataObj, id: `${Math.random()}` });
              return updatedInputs;
            });
          }}
        >
          <BookCopy />
        </Button>
        <InputEditor {...{ setMultiLangInputList, multiLangInputList, el, index }} />
        <InputDeleter {...{ setMultiLangInputList, multiLangInputList, el, index }} />
      </div>
    )
}

export default CSDPanel;