import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "./form-context";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Define the form schema for step 1
const step1Schema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters").max(100),
  companyType: z.enum(["pvt", "plc", "partnership", "sole"], { 
    errorMap: () => ({ message: "Please select a company type" })
  }),
  businessActivity: z.string().min(1, "Please select a business activity"),
  businessDescription: z.string().min(10, "Please provide a detailed business description"),
  initialCapital: z.coerce.number().min(1, "Initial capital must be greater than 0"),
  financialYearEnd: z.string().min(1, "Please select a financial year end"),
});

type Step1FormValues = z.infer<typeof step1Schema>;

type Step1Props = {
  onNext: () => void;
};

export default function Step1CompanyDetails({ onNext }: Step1Props) {
  const { formData, updateFormData } = useFormContext();
  
  // Fetch business activities from API
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['/api/business-activities'],
  });
  
  // Set up form with validation
  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.companyDetails || {
      companyName: "",
      companyType: undefined,
      businessActivity: "",
      businessDescription: "",
      initialCapital: 0,
      financialYearEnd: "",
    },
  });
  
  // Handle form submission
  function onSubmit(values: Step1FormValues) {
    updateFormData("companyDetails", values);
    onNext();
  }
  
  // Update form values if formData changes
  useEffect(() => {
    if (formData.companyDetails) {
      form.reset(formData.companyDetails);
    }
  }, [form, formData.companyDetails]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-primary-900">
        Step 1: Company Details
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="companyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Type <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Company Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pvt">Private Limited Company (Pvt Ltd)</SelectItem>
                      <SelectItem value="plc">Public Limited Company (PLC)</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole">Sole Proprietorship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessActivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Business Activity <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Business Activity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activitiesLoading ? (
                        <div className="p-2">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full mt-2" />
                          <Skeleton className="h-5 w-full mt-2" />
                        </div>
                      ) : (
                        activities?.map((activity: any) => (
                          <SelectItem key={activity.value} value={activity.value}>
                            {activity.label}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="initialCapital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Share Capital (USD) <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="financialYearEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Year End <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="02">February</SelectItem>
                      <SelectItem value="03">March</SelectItem>
                      <SelectItem value="04">April</SelectItem>
                      <SelectItem value="05">May</SelectItem>
                      <SelectItem value="06">June</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                      <SelectItem value="08">August</SelectItem>
                      <SelectItem value="09">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Business Description <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your business activities and purpose" 
                      className="resize-none" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="mt-8 flex justify-end">
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
