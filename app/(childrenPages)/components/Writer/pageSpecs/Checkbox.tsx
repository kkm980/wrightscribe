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
  addLangInMultiLangArr: any;
  potentialDeleteLangInMultiLangArr: any;
}

const CheckboxWrapper: React.FC<CheckboxWrapperProps> = ({ form, supportingLang, setSupportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr }) => {


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
                            checked={item.default === true ? true : supportingLang.includes(item.id)}
                            disabled={item.default === true}
                            onCheckedChange={(checked) => {

                              // alright, it needs attention to understand why we are doing localStorage setting here.
                              // on the page.tsx i.e main page when we are doing the setLocalStorage on supportingLanguage array change, it is
                              // seting bydefault to ["english"] only. so, there we have made condition that when there is length of supportingLang
                              // array greater than 1 then only set the local storage and here we are doing the check to 
                              // set localstorage only if there were two items in supportingLang array. why 2? bcz setSupportingLang is async.
                              // here set localstorage fun. will be called before setLang is called.
                              // i.e if in supportingLang array, there are elements- ["english", "arabic", "thai"] 
                              // and we are unchecking "thai" then setlocalstorage function on Page.tsx will be called
                              // and if and only if we are deleting the second last element (one extra language after english)
                              // then only set localstorage will be called here.
                              const localObj = JSON.parse(localStorage.getItem("wright_scribe_persistent_data") || '{}');
                              if(!checked){
                                return setSupportingLang(
                                  supportingLang.filter((value: any) => value !== item.id)),
                                potentialDeleteLangInMultiLangArr(item.id),
                                supportingLang.length === 2 &&
                                localStorage.setItem("wright_scribe_persistent_data", JSON.stringify({
                                  ...localObj,
                                  current_page_data: {
                                    ...localObj.current_page_data,
                                    supportingLang: ["english"]
                                  }
                                }))
                              } else {
                                return (setSupportingLang([...supportingLang, item.id]), addLangInMultiLangArr(item.id))
                              }
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
  addLangInMultiLangArr: any;
  potentialDeleteLangInMultiLangArr: any;
}
const CheckboxWrapperContainer: React.FC<ContainerProps> = ({ supportingLang, setSupportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  return <CheckboxWrapper {...{ form, supportingLang, setSupportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr }} />;
}

export default CheckboxWrapperContainer;
