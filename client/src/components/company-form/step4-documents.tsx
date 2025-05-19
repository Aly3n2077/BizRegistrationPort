import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "./form-context";

import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { FileIcon, XIcon } from "lucide-react";

// Define the schema for document uploads
const step4Schema = z.object({
  cr1Form: z.any().optional(),
  constitution: z.any().optional(),
  directorIDs: z.any().optional(),
  proofOfAddress: z.any().optional(),
}).refine((data) => {
  // At least one document type should be uploaded
  return data.cr1Form || data.constitution || data.directorIDs || data.proofOfAddress;
}, {
  message: "Please upload at least one required document",
  path: ["cr1Form"],
});

type Step4FormValues = {
  cr1Form?: File;
  constitution?: File;
  directorIDs?: File;
  proofOfAddress?: File;
};

type Step4Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function Step4Documents({ onNext, onPrev }: Step4Props) {
  const { formData, updateFormData } = useFormContext();
  const [documentFiles, setDocumentFiles] = useState<Partial<Step4FormValues>>({});
  
  // Set up form with validation
  const form = useForm<Step4FormValues>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      cr1Form: undefined,
      constitution: undefined,
      directorIDs: undefined,
      proofOfAddress: undefined,
    },
  });
  
  // Handle file uploads
  const handleFileChange = (name: keyof Step4FormValues, file: File | undefined) => {
    setDocumentFiles(prev => ({
      ...prev,
      [name]: file
    }));
    form.setValue(name, file);
  };
  
  // Handle form submission
  function onSubmit(values: Step4FormValues) {
    updateFormData("documents", values);
    onNext();
  }
  
  // Update form values if formData changes
  useEffect(() => {
    if (formData.documents) {
      setDocumentFiles(formData.documents);
      
      // Set form values for each document type
      if (formData.documents.cr1Form) {
        form.setValue("cr1Form", formData.documents.cr1Form);
      }
      if (formData.documents.constitution) {
        form.setValue("constitution", formData.documents.constitution);
      }
      if (formData.documents.directorIDs) {
        form.setValue("directorIDs", formData.documents.directorIDs);
      }
      if (formData.documents.proofOfAddress) {
        form.setValue("proofOfAddress", formData.documents.proofOfAddress);
      }
    }
  }, [form, formData.documents]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-primary-900">
        Step 4: Document Upload
      </h3>
      
      <p className="text-gray-600 mb-6">
        Please upload the following required documents. All documents must be in PDF format and less than 5MB in size.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <FormItem>
              <FormLabel>
                <h4 className="font-medium mb-2">Company Registration Form CR1</h4>
                <p className="text-sm text-gray-600 mb-3">Upload the completed CR1 form with director signatures.</p>
              </FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(file) => handleFileChange("cr1Form", file)}
                  accept=".pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {documentFiles.cr1Form && (
              <div className="mt-2 p-2 bg-white rounded border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm truncate max-w-[250px]">{documentFiles.cr1Form.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(documentFiles.cr1Form.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleFileChange("cr1Form", undefined)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <FormItem>
              <FormLabel>
                <h4 className="font-medium mb-2">Company Constitution or Articles of Association</h4>
                <p className="text-sm text-gray-600 mb-3">Upload the company constitution document.</p>
              </FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(file) => handleFileChange("constitution", file)}
                  accept=".pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {documentFiles.constitution && (
              <div className="mt-2 p-2 bg-white rounded border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm truncate max-w-[250px]">{documentFiles.constitution.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(documentFiles.constitution.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleFileChange("constitution", undefined)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <FormItem>
              <FormLabel>
                <h4 className="font-medium mb-2">Director ID Documents</h4>
                <p className="text-sm text-gray-600 mb-3">Upload copies of National ID or Passport for all directors.</p>
              </FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(file) => handleFileChange("directorIDs", file)}
                  accept=".pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {documentFiles.directorIDs && (
              <div className="mt-2 p-2 bg-white rounded border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm truncate max-w-[250px]">{documentFiles.directorIDs.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(documentFiles.directorIDs.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleFileChange("directorIDs", undefined)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <FormItem>
              <FormLabel>
                <h4 className="font-medium mb-2">Proof of Address</h4>
                <p className="text-sm text-gray-600 mb-3">Upload proof of registered office address (utility bill, lease agreement).</p>
              </FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(file) => handleFileChange("proofOfAddress", file)}
                  accept=".pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {documentFiles.proofOfAddress && (
              <div className="mt-2 p-2 bg-white rounded border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm truncate max-w-[250px]">{documentFiles.proofOfAddress.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(documentFiles.proofOfAddress.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleFileChange("proofOfAddress", undefined)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
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
