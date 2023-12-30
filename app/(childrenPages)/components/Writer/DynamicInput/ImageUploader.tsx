import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture" className="ml-2 mt-2">Drop or Upload Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
