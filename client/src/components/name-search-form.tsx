import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { motion } from "framer-motion";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, AlertCircle, CheckCircle2, Building2, FileType, FileCheck, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SplashCursor } from "@/components/ui/simple-splash-cursor";
import { BackgroundPaths } from "@/components/ui/background-paths";

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
  const [searchResult, setSearchResult] = useState<{isAvailable: boolean; companyName: string} | null>(null);
  
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
      
      setSearchResult(data);
      
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
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const resultVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      } 
    }
  };
  
  // Features list
  const features = [
    { 
      icon: <Building2 className="h-5 w-5 text-primary-700" />,
      title: "Company Name Check", 
      description: "Verify name availability instantly" 
    },
    { 
      icon: <FileType className="h-5 w-5 text-secondary-700" />,
      title: "Multiple Entity Types", 
      description: "Support for all business structures" 
    },
    { 
      icon: <FileCheck className="h-5 w-5 text-accent-700" />,
      title: "Instant Validation", 
      description: "Real-time checks against registry" 
    },
    { 
      icon: <CalendarDays className="h-5 w-5 text-primary-700" />,
      title: "30-Day Reservation", 
      description: "Hold your name while you register" 
    }
  ];

  return (
    <div className="relative overflow-hidden py-10">
      {/* Background elements */}
      <BackgroundPaths 
        className="absolute inset-0 z-0" 
        color="hsl(var(--secondary) / 0.05)" 
        density={15}
        opacity={0.4} 
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl z-0"></div>
      
      <div className="relative z-10 container mx-auto max-w-4xl px-6">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary-700 font-medium text-sm backdrop-blur-sm border border-primary/20">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            Business Name Availability Check
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Find Your Perfect Business Name
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check if your desired company name is available for registration in Zimbabwe's business registry.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form column */}
          <motion.div 
            className="md:col-span-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 relative overflow-hidden"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-3xl"></div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-full shadow-lg shadow-primary/20 flex items-center justify-center">
                <Search className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-800 font-medium">Company Name</FormLabel>
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
                        <FormLabel className="text-primary-800 font-medium">Entity Type</FormLabel>
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
                        <FormLabel className="text-primary-800 font-medium">Registration Number (Optional)</FormLabel>
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
                
                <div className="pt-4">
                  <SplashCursor color="hsla(var(--primary) / 0.2)">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 h-auto rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-[1.01]"
                      disabled={nameCheckMutation.isPending}
                    >
                      {nameCheckMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" strokeWidth={2} />
                          Checking Registry...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" strokeWidth={2} />
                          Check Name Availability
                        </>
                      )}
                    </Button>
                  </SplashCursor>
                </div>
              </form>
            </Form>
            
            {/* Search result */}
            {searchResult && (
              <motion.div 
                className={`mt-8 p-4 rounded-xl border ${
                  searchResult.isAvailable 
                    ? 'bg-green-50/70 border-green-200 text-green-800' 
                    : 'bg-red-50/70 border-red-200 text-red-800'
                }`}
                variants={resultVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center">
                  {searchResult.isAvailable ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-semibold mb-1">
                      {searchResult.isAvailable ? 'Name Available' : 'Name Not Available'}
                    </h3>
                    <p className="text-sm">
                      {searchResult.isAvailable 
                        ? `"${searchResult.companyName}" is available for registration.`
                        : `"${searchResult.companyName}" is already registered or reserved.`
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Features column */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 shadow-lg border border-primary-100 mb-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Why Check Name Availability?</h3>
              <p className="text-gray-600 mb-4">
                Securing a unique business name is the first step in establishing your brand identity and legal presence in Zimbabwe.
              </p>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm mr-3 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="text-center p-4 bg-accent-50/50 rounded-xl border border-accent-100">
              <p className="text-sm text-gray-600">
                After confirming name availability, you can proceed to
                <span className="font-medium text-accent-700"> reserve the name for 30 days </span>
                while you complete your company registration.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
