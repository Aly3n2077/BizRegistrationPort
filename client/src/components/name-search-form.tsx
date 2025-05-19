import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define validation schema for the name search form
const nameSearchSchema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters"),
  entityType: z.string().min(1, "Please select an entity type"),
  registrationNumber: z.string().optional(),
});

type NameSearchValues = z.infer<typeof nameSearchSchema>;

type NameSearchFormProps = {
  onSearchResult?: (result: any) => void;
};

export default function NameSearchForm({ onSearchResult }: NameSearchFormProps) {
  const { toast } = useToast();
  const [searchInitiated, setSearchInitiated] = useState(false);
  
  // Set up form with validation
  const form = useForm<NameSearchValues>({
    resolver: zodResolver(nameSearchSchema),
    defaultValues: {
      companyName: "",
      entityType: "",
      registrationNumber: "",
    },
  });
  
  // Company name check mutation
  const nameCheckMutation = useMutation({
    mutationFn: async (data: NameSearchValues) => {
      setSearchInitiated(true);
      const response = await apiRequest('POST', '/api/name-check', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (onSearchResult) {
        onSearchResult(data);
      }
      
      toast({
        title: data.isAvailable ? "Name Available" : "Name Not Available",
        description: data.isAvailable 
          ? `The company name "${data.companyName}" is available for registration.`
          : `The company name "${data.companyName}" is already registered or reserved.`,
        variant: data.isAvailable ? "default" : "destructive",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Search Failed",
        description: error.message || "An error occurred while checking the company name. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  function onSubmit(values: NameSearchValues) {
    nameCheckMutation.mutate(values);
  }

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-100 rounded-full opacity-50 blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-3 rounded-full shadow-lg">
            <Search className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-800 font-medium text-sm">Company Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your desired company name" 
                      className="h-12 px-4 rounded-xl shadow-sm border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-800 font-medium text-sm">Entity Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 px-4 rounded-xl shadow-sm border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pvt">Private Limited Company</SelectItem>
                        <SelectItem value="plc">Public Limited Company</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="sole">Sole Proprietorship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-800 font-medium text-sm">Registration Number (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter existing registration number" 
                        className="h-12 px-4 rounded-xl shadow-sm border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 h-auto rounded-xl font-semibold shadow-lg shadow-primary-600/20 transition-all duration-300 transform hover:scale-[1.02]"
                disabled={nameCheckMutation.isPending}
              >
                {nameCheckMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Checking Availability...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Check Name Availability
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {/* Additional information section */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">The system will check against the national business registry to verify availability.</p>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              <span>Check takes 3-5 seconds</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span>Results are valid for 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
