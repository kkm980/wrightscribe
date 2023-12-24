"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import languages from "@/constants/languageConstants";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface CheckboxWrapperProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  supportingLang: any;
  setSupportingLang: any;
}

const CheckboxWrapper: React.FC<CheckboxWrapperProps> = ({ form, supportingLang, setSupportingLang}) => {

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="flex justify-start flex-wrap gap-4 w-[inherit] py-2 px-1 max-h-[100px] overflow-y-scroll languageContainer">
                {languages.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={item.default===true? true:supportingLang.includes(item.id)}
                            disabled={item.default===true}
                            onCheckedChange={(checked) => {
                              return checked
                                ? setSupportingLang([...supportingLang, item.id])
                                : setSupportingLang(
                                  supportingLang.filter(
                                    (value:any) => value !== item.id
                                  )
                                );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

interface ContainerProps {
  supportingLang: any;
   setSupportingLang: any;
}
const CheckboxWrapperContainer: React.FC<ContainerProps> = ({ supportingLang, setSupportingLang}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  return <CheckboxWrapper {...{form, supportingLang, setSupportingLang}} />;
}

export default CheckboxWrapperContainer;
