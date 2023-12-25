import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DialogueBoxProps {
  multiLang: any;
  setMultiLang: any;
}

const MultiLangSelector: React.FC<DialogueBoxProps> = ({multiLang, setMultiLang}) => {

  return (
    <div className="flex items-center space-x-2 mb-4 mr-0 bg-slate-600 hover:slate-800 text-[white] dark:text-[black] rounded-md p-1 py-2 cursor-pointer">
      <Switch id="airplane-mode" onCheckedChange={()=>{setMultiLang(!multiLang)}}/>
      <Label htmlFor="airplane-mode">Languages</Label>
    </div>
  )
}

export default MultiLangSelector;
