import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { Trash2 } from 'lucide-react';

interface InputSelectorProps {
  setMultiLangInputList: any;
  multiLangInputList: any;
  el: any;
  index: any;
}
  const InputDeleter: React.FC<InputSelectorProps> = ({ setMultiLangInputList, multiLangInputList, el, index }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="p-1">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected field.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction
            onClick={()=>{
              const localObj = JSON.parse(localStorage.getItem("wright_scribe_persistent_data") || '{}');
              setMultiLangInputList((prevInputList: any) => {
                    const updatedInputs = prevInputList.filter((_:any, i: number) => i !== index);
                    return updatedInputs;
                  });

                  multiLangInputList?.length === 1 && localStorage.setItem("wright_scribe_persistent_data", JSON.stringify({
                    ...localObj,
                    current_page_data: {
                      ...localObj.current_page_data,
                      multiLangInputList: []
                    }
                  }));
              console.log(multiLangInputList,"multi", el, "el",index,"index");
            }}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
export default InputDeleter;