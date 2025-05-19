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
import { Loader2 } from "lucide-react";
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your desired company name" {...field} />
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
                  <FormLabel>Entity Type</FormLabel>
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
                  <FormLabel>Registration Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter existing registration number" {...field} />
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
            className="bg-primary-600 hover:bg-primary-700"
            disabled={nameCheckMutation.isPending}
          >
            {nameCheckMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check Availability"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
