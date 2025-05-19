import React, { createContext, useContext, useState, ReactNode } from "react";
import { RegistrationFormValues } from "@shared/schema";

type FormContextType = {
  formData: Partial<RegistrationFormValues>;
  updateFormData: (step: keyof RegistrationFormValues, data: any) => void;
  resetForm: () => void;
  handleSubmit: () => void;
};

const initialFormData: Partial<RegistrationFormValues> = {
  companyDetails: {
    companyName: "",
    companyType: "" as any,
    businessActivity: "",
    businessDescription: "",
    initialCapital: 0,
    financialYearEnd: "",
  },
  directors: [],
  shareholders: [],
  address: {
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
  documents: {},
  termsAgree: false,
  privacyAgree: false,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

type FormProviderProps = {
  children: ReactNode;
  onSubmit: (formData: FormData) => void;
};

export const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<RegistrationFormValues>>(initialFormData);

  const updateFormData = (step: keyof RegistrationFormValues, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: data
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = () => {
    // Convert the form data to FormData for file uploads
    const formDataObj = new FormData();
    
    // Add company details as JSON string
    formDataObj.append("companyDetails", JSON.stringify(formData.companyDetails));
    
    // Add directors as JSON string
    formDataObj.append("directors", JSON.stringify(formData.directors));
    
    // Add shareholders as JSON string
    formDataObj.append("shareholders", JSON.stringify(formData.shareholders));
    
    // Add address as JSON string
    formDataObj.append("address", JSON.stringify(formData.address));
    
    // Add terms and privacy agreement
    formDataObj.append("termsAgree", String(formData.termsAgree));
    formDataObj.append("privacyAgree", String(formData.privacyAgree));
    
    // Add file uploads
    if (formData.documents) {
      if (formData.documents.cr1Form) {
        formDataObj.append("cr1Form", formData.documents.cr1Form);
      }
      
      if (formData.documents.constitution) {
        formDataObj.append("constitution", formData.documents.constitution);
      }
      
      if (formData.documents.directorIDs) {
        formDataObj.append("directorIDs", formData.documents.directorIDs);
      }
      
      if (formData.documents.proofOfAddress) {
        formDataObj.append("proofOfAddress", formData.documents.proofOfAddress);
      }
    }
    
    onSubmit(formDataObj);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, handleSubmit }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
