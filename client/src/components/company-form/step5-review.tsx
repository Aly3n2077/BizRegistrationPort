import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "./form-context";
import { useQuery } from "@tanstack/react-query";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Loader2, FileIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Define schema for terms and privacy agreement
const step5Schema = z.object({
  termsAgree: z.boolean().refine(val => val === true, {
    message: "You must confirm that the information provided is accurate and complete"
  }),
  privacyAgree: z.boolean().refine(val => val === true, {
    message: "You must agree to the Privacy Policy and Terms of Service"
  }),
});

type Step5FormValues = z.infer<typeof step5Schema>;

type Step5Props = {
  onPrev: () => void;
  isSubmitting: boolean;
};

export default function Step5Review({ onPrev, isSubmitting }: Step5Props) {
  const { formData, updateFormData, handleSubmit } = useFormContext();
  
  // Fetch cities and provinces for display in review
  const { data: cities } = useQuery({
    queryKey: ['/api/cities'],
  });
  
  const { data: provinces } = useQuery({
    queryKey: ['/api/provinces'],
  });
  
  const { data: activities } = useQuery({
    queryKey: ['/api/business-activities'],
  });
  
  // Set up form with validation
  const form = useForm<Step5FormValues>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      termsAgree: formData.termsAgree || false,
      privacyAgree: formData.privacyAgree || false,
    },
  });
  
  // Get city, province and activity labels
  const getCityLabel = (value: string) => {
    return cities?.find((city: any) => city.value === value)?.label || value;
  };
  
  const getProvinceLabel = (value: string) => {
    return provinces?.find((province: any) => province.value === value)?.label || value;
  };
  
  const getActivityLabel = (value: string) => {
    return activities?.find((activity: any) => activity.value === value)?.label || value;
  };
  
  // Get company type label
  const getCompanyTypeLabel = (value: string) => {
    const types: Record<string, string> = {
      'pvt': 'Private Limited Company (Pvt Ltd)',
      'plc': 'Public Limited Company (PLC)',
      'partnership': 'Partnership',
      'sole': 'Sole Proprietorship'
    };
    return types[value] || value;
  };
  
  // Get shareholder type label
  const getShareholderTypeLabel = (value: string) => {
    const types: Record<string, string> = {
      'individual': 'Individual',
      'company': 'Company'
    };
    return types[value] || value;
  };
  
  // Get month name from financial year end
  const getMonthName = (monthNum: string) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const index = parseInt(monthNum, 10) - 1;
    return months[index] || monthNum;
  };
  
  // Handle form submission
  function onSubmit(values: Step5FormValues) {
    updateFormData("termsAgree", values.termsAgree);
    updateFormData("privacyAgree", values.privacyAgree);
    handleSubmit();
  }
  
  // Update form values if formData changes
  useEffect(() => {
    form.reset({
      termsAgree: formData.termsAgree || false,
      privacyAgree: formData.privacyAgree || false,
    });
  }, [form, formData.termsAgree, formData.privacyAgree]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-primary-900">
        Step 5: Review & Submit
      </h3>
      
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Application Summary</h4>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-primary-900 mb-2">Company Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium">{formData.companyDetails?.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company Type</p>
                <p className="font-medium">{getCompanyTypeLabel(formData.companyDetails?.companyType || '')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Business Activity</p>
                <p className="font-medium">
                  {activities ? (
                    getActivityLabel(formData.companyDetails?.businessActivity || '')
                  ) : (
                    <Skeleton className="h-5 w-40" />
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Initial Share Capital</p>
                <p className="font-medium">USD {formData.companyDetails?.initialCapital?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Financial Year End</p>
                <p className="font-medium">
                  {formData.companyDetails?.financialYearEnd 
                    ? getMonthName(formData.companyDetails.financialYearEnd)
                    : ''}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Business Description</p>
                <p className="font-medium">{formData.companyDetails?.businessDescription}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-primary-900 mb-2">Directors & Shareholders</h5>
            <div className="space-y-3">
              {formData.directors?.map((director, index) => (
                <div key={index} className="pb-2 border-b border-gray-200 last:border-0">
                  <p className="text-sm text-gray-500">Director</p>
                  <p className="font-medium">{director.fullName}</p>
                  <p className="text-sm">ID: {director.idNumber}</p>
                  <p className="text-sm">Email: {director.email}</p>
                  <p className="text-sm">Phone: {director.phoneNumber}</p>
                </div>
              ))}
              
              <Separator className="my-2" />
              
              {formData.shareholders?.map((shareholder, index) => (
                <div key={index} className="pb-2 border-b border-gray-200 last:border-0">
                  <p className="text-sm text-gray-500">Shareholder</p>
                  <p className="font-medium">{shareholder.fullName} ({shareholder.sharePercentage}%)</p>
                  <p className="text-sm">{getShareholderTypeLabel(shareholder.shareholderType)}</p>
                  <p className="text-sm">ID: {shareholder.idNumber}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-primary-900 mb-2">Business Address</h5>
            <div>
              <p>{formData.address?.streetAddress}</p>
              {formData.address?.suburb && <p>{formData.address.suburb}</p>}
              <p>
                {cities ? (
                  getCityLabel(formData.address?.city || '')
                ) : (
                  <Skeleton className="h-5 w-40" />
                )}, {" "}
                {provinces ? (
                  getProvinceLabel(formData.address?.province || '')
                ) : (
                  <Skeleton className="h-5 w-40" />
                )}
              </p>
              {formData.address?.postalCode && <p>Postal Code: {formData.address.postalCode}</p>}
              
              {formData.address?.isPostalDifferent && (
                <>
                  <h6 className="font-medium mt-3 mb-1">Postal Address</h6>
                  <p>{formData.address.postalAddress}</p>
                  <p>{formData.address.postalCity}, {formData.address.postalProvince}</p>
                  {formData.address.postalPostalCode && (
                    <p>Postal Code: {formData.address.postalPostalCode}</p>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-primary-900 mb-2">Uploaded Documents</h5>
            <ul className="space-y-2">
              {formData.documents?.cr1Form && (
                <li className="flex items-center">
                  <FileIcon className="text-red-500 h-5 w-5 mr-2" />
                  <span>{formData.documents.cr1Form.name}</span>
                </li>
              )}
              
              {formData.documents?.constitution && (
                <li className="flex items-center">
                  <FileIcon className="text-red-500 h-5 w-5 mr-2" />
                  <span>{formData.documents.constitution.name}</span>
                </li>
              )}
              
              {formData.documents?.directorIDs && (
                <li className="flex items-center">
                  <FileIcon className="text-red-500 h-5 w-5 mr-2" />
                  <span>{formData.documents.directorIDs.name}</span>
                </li>
              )}
              
              {formData.documents?.proofOfAddress && (
                <li className="flex items-center">
                  <FileIcon className="text-red-500 h-5 w-5 mr-2" />
                  <span>{formData.documents.proofOfAddress.name}</span>
                </li>
              )}
              
              {Object.keys(formData.documents || {}).length === 0 && (
                <li className="text-gray-500">No documents uploaded</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-6">
            <FormField
              control={form.control}
              name="termsAgree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel className="font-medium text-gray-700">
                      I confirm all information provided is accurate and complete.
                    </FormLabel>
                    <p className="text-gray-500 text-sm mt-1">
                      I understand that providing false information may result in rejection of the application and potential legal consequences.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="privacyAgree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel className="font-medium text-gray-700">
                      I have read and agree to the{" "}
                      <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                        Terms of Service
                      </a>.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={onPrev}
              disabled={isSubmitting}
            >
              Previous Step
            </Button>
            <Button 
              type="submit" 
              className="bg-primary-600 hover:bg-primary-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
