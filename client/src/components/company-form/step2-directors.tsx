import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "./form-context";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the schema for directors
const directorSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  idNumber: z.string().min(5, "Valid ID number is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Valid phone number is required"),
});

// Define the schema for shareholders
const shareholderSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  idNumber: z.string().min(5, "Valid ID number is required"),
  sharePercentage: z.coerce.number().min(1, "Share percentage must be between 1 and 100").max(100),
  shareholderType: z.enum(["individual", "company"], {
    errorMap: () => ({ message: "Please select shareholder type" })
  }),
});

// Define the overall form schema for step 2
const step2Schema = z.object({
  directors: z.array(directorSchema).min(1, "At least one director is required"),
  shareholders: z.array(shareholderSchema).min(1, "At least one shareholder is required"),
});

type Step2FormValues = z.infer<typeof step2Schema>;

type Step2Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function Step2Directors({ onNext, onPrev }: Step2Props) {
  const { formData, updateFormData } = useFormContext();
  const [totalSharePercentage, setTotalSharePercentage] = useState(0);
  
  // Set up form with validation
  const form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      directors: formData.directors?.length ? formData.directors : [{ fullName: "", idNumber: "", email: "", phoneNumber: "" }],
      shareholders: formData.shareholders?.length ? formData.shareholders : [{ fullName: "", idNumber: "", sharePercentage: 0, shareholderType: undefined as any }],
    },
  });
  
  // Get directors and shareholders field arrays
  const { fields: directorFields, append: appendDirector, remove: removeDirector } = useFieldArray({
    control: form.control,
    name: "directors",
  });
  
  const { fields: shareholderFields, append: appendShareholder, remove: removeShareholder } = useFieldArray({
    control: form.control,
    name: "shareholders",
  });
  
  // Watch the shareholders array to calculate total percentage
  const shareholders = form.watch("shareholders");
  
  // Calculate total share percentage
  useEffect(() => {
    const total = shareholders.reduce((sum, shareholder) => sum + (shareholder.sharePercentage || 0), 0);
    setTotalSharePercentage(total);
  }, [shareholders]);
  
  // Handle form submission
  function onSubmit(values: Step2FormValues) {
    updateFormData("directors", values.directors);
    updateFormData("shareholders", values.shareholders);
    onNext();
  }
  
  // Update form values if formData changes
  useEffect(() => {
    const defaultValues = {
      directors: formData.directors?.length ? formData.directors : [{ fullName: "", idNumber: "", email: "", phoneNumber: "" }],
      shareholders: formData.shareholders?.length ? formData.shareholders : [{ fullName: "", idNumber: "", sharePercentage: 0, shareholderType: undefined as any }],
    };
    form.reset(defaultValues);
  }, [form, formData.directors, formData.shareholders]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-primary-900">
        Step 2: Directors & Shareholders
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Director Information</h4>
            
            {directorFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg mb-4">
                <FormField
                  control={form.control}
                  name={`directors.${index}.fullName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter director's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`directors.${index}.idNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National ID Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter national ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`directors.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`directors.${index}.phoneNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {directorFields.length > 1 && (
                  <div className="flex justify-end md:col-span-2">
                    <Button 
                      type="button" 
                      variant="destructive"
                      onClick={() => removeDirector(index)}
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove Director
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={() => appendDirector({ fullName: "", idNumber: "", email: "", phoneNumber: "" })}
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Another Director
            </Button>
          </div>
          
          <Separator />
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Shareholder Information</h4>
              <div className="text-sm">
                <span className={totalSharePercentage === 100 ? "text-green-600" : "text-red-600"}>
                  Total: {totalSharePercentage}% 
                  {totalSharePercentage === 100 ? " ✓" : " (must be 100%)"}
                </span>
              </div>
            </div>
            
            {shareholderFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg mb-4">
                <FormField
                  control={form.control}
                  name={`shareholders.${index}.fullName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter shareholder's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`shareholders.${index}.idNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National ID Number / Registration No. <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID or registration number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`shareholders.${index}.shareholderType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shareholder Type <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`shareholders.${index}.sharePercentage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Share Percentage <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="100" 
                          placeholder="Enter percentage (1-100)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {shareholderFields.length > 1 && (
                  <div className="flex justify-end md:col-span-2">
                    <Button 
                      type="button" 
                      variant="destructive"
                      onClick={() => removeShareholder(index)}
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove Shareholder
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={() => appendShareholder({ fullName: "", idNumber: "", sharePercentage: 0, shareholderType: undefined as any })}
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Another Shareholder
            </Button>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={onPrev}
            >
              Previous Step
            </Button>
            <Button 
              type="submit" 
              className="bg-primary-600 hover:bg-primary-700"
            >
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
