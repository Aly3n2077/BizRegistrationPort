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
import { Loader2, CheckCircle, XCircle } from "lucide-react";
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
  const [searchResult, setSearchResult] = useState<{isAvailable: boolean, companyName: string} | null>(null);
  
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
      const response = await apiRequest('POST', '/api/name-check', data);
      return response.json();
    },
    onSuccess: (data) => {
      setSearchResult(data);
      
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
      setSearchResult(null);
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
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6 flex items-center justify-center">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 ml-3">Company Name Search</h2>
      </div>
      
      {searchResult && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${searchResult.isAvailable ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {searchResult.isAvailable ? (
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 mr-2 text-red-600" />
          )}
          <p className="text-sm font-medium">
            {searchResult.isAvailable
              ? `"${searchResult.companyName}" is available for registration!`
              : `"${searchResult.companyName}" is already registered or reserved.`}
          </p>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Company Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your desired company name"
                    className="bg-gray-50 border-gray-200 focus:bg-white" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-48">
              <FormField
                control={form.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Entity Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex-1">
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Registration Number (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter existing registration number" 
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-2.5 rounded-lg shadow-sm hover:shadow"
              disabled={nameCheckMutation.isPending}
            >
              {nameCheckMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Availability...
                </>
              ) : (
                "Check Availability"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}