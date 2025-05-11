import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { 
  insertNameSearchSchema, 
  insertCompanyRegistrationSchema, 
  insertDirectorSchema, 
  insertShareholderSchema, 
  insertAddressSchema, 
  insertDocumentSchema,
  statusTrackingSchema
} from "@shared/schema";
import { z, ZodError } from "zod";

// Set up in-memory file storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware
  const handleError = (err: Error, res: Response) => {
    console.error(err);
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || "Internal server error" });
  };

  // Check company name availability
  app.post("/api/name-check", async (req: Request, res: Response) => {
    try {
      const data = insertNameSearchSchema.parse(req.body);
      const result = await storage.searchCompanyName(data);
      res.json(result);
    } catch (err) {
      handleError(err as Error, res);
    }
  });

  // Track application status
  app.get("/api/application-status/:reference", async (req: Request, res: Response) => {
    try {
      const { reference } = req.params;
      const parsed = statusTrackingSchema.parse({ referenceNumber: reference });
      
      const registration = await storage.getRegistrationByReference(parsed.referenceNumber);
      if (!registration) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      const statusHistory = await storage.getStatusHistoryByRegistration(registration.id);
      
      res.json({
        registration,
        statusHistory
      });
    } catch (err) {
      handleError(err as Error, res);
    }
  });

  // Submit registration
  app.post("/api/registrations", upload.fields([
    { name: 'cr1Form', maxCount: 1 },
    { name: 'constitution', maxCount: 1 },
    { name: 'directorIDs', maxCount: 10 },
    { name: 'proofOfAddress', maxCount: 1 }
  ]), async (req: Request, res: Response) => {
    try {
      // Parse company details
      const companyData = insertCompanyRegistrationSchema.parse(JSON.parse(req.body.companyDetails));
      
      // Create company registration
      const registration = await storage.createRegistration(companyData);
      
      // Parse and create directors
      const directorsData = JSON.parse(req.body.directors);
      for (const directorData of directorsData) {
        const director = insertDirectorSchema.parse({
          ...directorData,
          registrationId: registration.id
        });
        await storage.createDirector(director);
      }
      
      // Parse and create shareholders
      const shareholdersData = JSON.parse(req.body.shareholders);
      for (const shareholderData of shareholdersData) {
        const shareholder = insertShareholderSchema.parse({
          ...shareholderData,
          registrationId: registration.id
        });
        await storage.createShareholder(shareholder);
      }
      
      // Parse and create address
      const addressData = insertAddressSchema.parse({
        ...JSON.parse(req.body.address),
        registrationId: registration.id
      });
      await storage.createAddress(addressData);
      
      // Handle file uploads
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      if (files) {
        // Process each document type
        for (const [fieldname, fileArray] of Object.entries(files)) {
          if (fileArray && fileArray.length > 0) {
            const file = fileArray[0];
            
            // Convert file buffer to base64 for storage
            const base64Data = file.buffer.toString('base64');
            
            const document = insertDocumentSchema.parse({
              registrationId: registration.id,
              documentType: fieldname,
              fileName: file.originalname,
              fileSize: file.size,
              mimeType: file.mimetype,
              fileData: base64Data
            });
            
            await storage.createDocument(document);
          }
        }
      }
      
      // Add new status history item
      await storage.createStatusHistory({
        registrationId: registration.id,
        status: "Document Verification",
        description: "Your documents are being verified. This process may take 2-3 business days."
      });
      
      res.status(201).json({ 
        message: "Registration submitted successfully", 
        referenceNumber: registration.referenceNumber 
      });
    } catch (err) {
      handleError(err as Error, res);
    }
  });

  // Get all business activities (for form dropdown)
  app.get("/api/business-activities", (_req: Request, res: Response) => {
    const activities = [
      { value: "agriculture", label: "Agriculture & Farming" },
      { value: "mining", label: "Mining & Natural Resources" },
      { value: "manufacturing", label: "Manufacturing" },
      { value: "retail", label: "Retail & Wholesale" },
      { value: "technology", label: "Technology & IT Services" },
      { value: "tourism", label: "Tourism & Hospitality" },
      { value: "professional", label: "Professional Services" },
      { value: "other", label: "Other Services" }
    ];
    
    res.json(activities);
  });

  // Get all cities in Zimbabwe (for form dropdown)
  app.get("/api/cities", (_req: Request, res: Response) => {
    const cities = [
      { value: "harare", label: "Harare" },
      { value: "bulawayo", label: "Bulawayo" },
      { value: "chitungwiza", label: "Chitungwiza" },
      { value: "mutare", label: "Mutare" },
      { value: "gweru", label: "Gweru" },
      { value: "kwekwe", label: "Kwekwe" },
      { value: "kadoma", label: "Kadoma" },
      { value: "masvingo", label: "Masvingo" },
      { value: "chinhoyi", label: "Chinhoyi" },
      { value: "other", label: "Other" }
    ];
    
    res.json(cities);
  });

  // Get all provinces in Zimbabwe (for form dropdown)
  app.get("/api/provinces", (_req: Request, res: Response) => {
    const provinces = [
      { value: "harare", label: "Harare" },
      { value: "bulawayo", label: "Bulawayo" },
      { value: "manicaland", label: "Manicaland" },
      { value: "mashonaland_central", label: "Mashonaland Central" },
      { value: "mashonaland_east", label: "Mashonaland East" },
      { value: "mashonaland_west", label: "Mashonaland West" },
      { value: "masvingo", label: "Masvingo" },
      { value: "matabeleland_north", label: "Matabeleland North" },
      { value: "matabeleland_south", label: "Matabeleland South" },
      { value: "midlands", label: "Midlands" }
    ];
    
    res.json(provinces);
  });

  const httpServer = createServer(app);
  return httpServer;
}
