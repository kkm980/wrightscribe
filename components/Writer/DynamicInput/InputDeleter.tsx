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
              setMultiLangInputList((prevInputList: any) => {
                    const updatedInputs = prevInputList.filter((_:any, i: number) => i !== index);
                    return updatedInputs;
                  });
                  
            }}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
export default InputDeleter;