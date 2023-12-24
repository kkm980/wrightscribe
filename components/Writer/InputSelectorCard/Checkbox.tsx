import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface InputSelectorCardProps {
    availableTextTypes: string[];
    selectedTextValue: any;
    setSelectedType: any;
    selectedType: any;
}

export const CheckboxReactHookFormMultiple: React.FC<InputSelectorCardProps> = ({
    availableTextTypes,
    selectedTextValue,
    setSelectedType,
    selectedType,
}) => {
    const FormSchema = z.object({
        selectedTypes: z.array(z.string()).refine((value) => value.length > 0, {
            message: "You have to select at least one item.",
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            selectedTypes: [],
        },
    });

    return (
        <Form {...form}>
            <form className="space-y-8">
                <FormField
                    name="selectedTypes"
                    render={() => (
                        <FormItem>
                            <div className="mb-0">
                                <FormLabel className="text-base mb-0 pb-0">Choose text types</FormLabel>
                            </div>
                            <div className="flex justify-start items-start border flex-wrap rounded-lg p-1 mt-0">
                                {availableTextTypes.map((textType) => (
                                    <Controller
                                        key={textType}
                                        control={form.control}
                                        name="selectedTypes"
                                        render={({ field }) => (
                                            <div className="w-max my-1 mr-3 flex flex-row items-start space-x-1 space-y-0">
                                                <Checkbox
                                                    checked={selectedType?.includes(textType)}
                                                    onCheckedChange={(checked) => {
                                                        checked
                                                            ? setSelectedType([...selectedType, textType])

                                                            : setSelectedType(
                                                                selectedType?.filter(
                                                                    (value: any) => value !== textType
                                                                )
                                                            );
                                                    }}
                                                />
                                                <FormLabel className="font-normal">{textType}</FormLabel>
                                            </div>
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
