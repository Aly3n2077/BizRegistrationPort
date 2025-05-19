import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "./form-context";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the schema for address form
const step3Schema = z.object({
  streetAddress: z.string().min(5, "Street address is required"),
  suburb: z.string().optional(),
  city: z.string().min(1, "City/Town is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().optional(),
  isPostalDifferent: z.boolean().default(false),
  postalAddress: z.string().optional(),
  postalCity: z.string().optional(),
  postalProvince: z.string().optional(),
  postalPostalCode: z.string().optional(),
}).refine((data) => {
  // If postal is different, then postal address fields should be filled
  if (data.isPostalDifferent) {
    return !!data.postalAddress && !!data.postalCity && !!data.postalProvince;
  }
  return true;
}, {
  message: "Please fill all required postal address fields",
  path: ["postalAddress"],
});

type Step3FormValues = z.infer<typeof step3Schema>;

type Step3Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function Step3Address({ onNext, onPrev }: Step3Props) {
  const { formData, updateFormData } = useFormContext();
  
  // Fetch cities
  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: ['/api/cities'],
  });
  
  // Fetch provinces
  const { data: provinces, isLoading: provincesLoading } = useQuery({
    queryKey: ['/api/provinces'],
  });
  
  // Set up form with validation
  const form = useForm<Step3FormValues>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData.address || {
      streetAddress: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
      isPostalDifferent: false,
      postalAddress: "",
      postalCity: "",
      postalProvince: "",
      postalPostalCode: "",
    },
  });
  
  // Watch isPostalDifferent to toggle postal address section
  const isPostalDifferent = form.watch("isPostalDifferent");
  
  // Handle form submission
  function onSubmit(values: Step3FormValues) {
    updateFormData("address", values);
    onNext();
  }
  
  // Update form values if formData changes
  useEffect(() => {
    if (formData.address) {
      form.reset(formData.address);
    }
  }, [form, formData.address]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-primary-900">
        Step 3: Business Address
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Registered Office Address</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="suburb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suburb/Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter suburb or area (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Town <span className="text-red-500">*</span></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select City/Town" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {citiesLoading ? (
                          <div className="p-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full mt-2" />
                            <Skeleton className="h-5 w-full mt-2" />
                          </div>
                        ) : (
                          cities?.map((city: any) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
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
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province <span className="text-red-500">*</span></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provincesLoading ? (
                          <div className="p-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full mt-2" />
                            <Skeleton className="h-5 w-full mt-2" />
                          </div>
                        ) : (
                          provinces?.map((province: any) => (
                            <SelectItem key={province.value} value={province.value}>
                              {province.label}
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
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter postal code (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Postal Address (if different from registered address)</h4>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="isPostalDifferent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Postal address is different from registered address</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {isPostalDifferent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="postalAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Address <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter postal address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="postalCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City/Town <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city or town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="postalProvince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="postalPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter postal code (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
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
