import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Cloud, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type FileUploadProps = {
  onChange: (file: File | undefined) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
};

export default function FileUpload({ 
  onChange,
  accept = ".pdf",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejectionErrors = rejectedFiles[0].errors;
      
      if (rejectionErrors[0].code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB`);
        toast({
          variant: "destructive",
          title: "File too large",
          description: `Maximum file size is ${maxSize / (1024 * 1024)}MB.`
        });
        return;
      }
      
      if (rejectionErrors[0].code === "file-invalid-type") {
        setError(`Invalid file type. Accepted: ${accept}`);
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `Please upload a file in ${accept} format.`
        });
        return;
      }
      
      setError(rejectionErrors[0].message);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: rejectionErrors[0].message
      });
      return;
    }
    
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0]);
      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded."
      });
    }
  }, [onChange, accept, maxSize, toast]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize: maxSize,
    multiple: false
  });
  
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition",
        isDragActive 
          ? "border-primary-500 bg-primary-50" 
          : "border-primary-200 bg-white hover:bg-primary-50",
        error ? "border-red-300" : "",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {error ? (
          <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
        ) : (
          <Cloud className="w-6 h-6 text-primary-500 mb-2" />
        )}
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">
          {accept.replace(".", "").toUpperCase()} (MAX. {maxSize / (1024 * 1024)}MB)
        </p>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
}
