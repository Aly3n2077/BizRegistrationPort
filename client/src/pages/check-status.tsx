import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatusTracker from "@/components/status-tracker";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const statusTrackingSchema = z.object({
  referenceNumber: z.string().min(5, "Please enter a valid reference number"),
});

type StatusTrackingValues = z.infer<typeof statusTrackingSchema>;

export default function CheckStatus() {
  const [searchParams] = useSearch();
  const [, navigate] = useLocation();
  const defaultRef = new URLSearchParams(searchParams).get("reference") || "";
  const [reference, setReference] = useState(defaultRef);
  
  const form = useForm<StatusTrackingValues>({
    resolver: zodResolver(statusTrackingSchema),
    defaultValues: {
      referenceNumber: defaultRef,
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [reference ? `/api/application-status/${reference}` : null],
    enabled: !!reference,
  });

  function onSubmit(values: StatusTrackingValues) {
    setReference(values.referenceNumber);
    navigate(`/check-status?reference=${values.referenceNumber}`);
  }

  return (
    <>
      <Helmet>
        <title>Track Application Status - Zimbabwe Business Registration Portal</title>
        <meta name="description" content="Track the status of your business registration application. Check where your application is in the process and get estimated completion dates." />
      </Helmet>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary-900 text-center">Track Your Application Status</h1>
            <p className="text-gray-600 mb-8 text-center">Enter your application reference number to check the current status of your business registration.</p>
            
            <div className="glassmorphism rounded-xl p-6 md:p-8 bg-primary-50">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="referenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Reference Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. ZW-CR-2023-12345" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      Track Application
                    </Button>
                  </div>
                </form>
              </Form>
              
              {reference && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {isLoading && (
                    <div className="space-y-3">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  )}
                  
                  {isError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {(error as Error)?.message || "Application not found. Please check the reference number and try again."}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {!isLoading && !isError && data && (
                    <StatusTracker 
                      registration={data.registration} 
                      statusHistory={data.statusHistory} 
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
