import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

export default function MultiLangSelector() {
    const [check, setCheck] = useState(false);
    useEffect(()=>{
      console.log(check, "check")
    },[check])
  return (
    <div className="flex items-center space-x-2 mb-4 mr-0 bg-slate-600 hover:slate-800 text-[white] dark:text-[black] rounded-md p-1 py-2 cursor-pointer">
      <Switch id="airplane-mode" onCheckedChange={()=>{setCheck(!check)}}/>
      <Label htmlFor="airplane-mode">Languages</Label>
    </div>
  )
}
