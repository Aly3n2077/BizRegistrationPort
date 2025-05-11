import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User/Account schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Company registration schema
export const companyRegistrations = pgTable("company_registrations", {
  id: serial("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  companyType: text("company_type").notNull(),
  businessActivity: text("business_activity").notNull(),
  businessDescription: text("business_description").notNull(),
  initialCapital: integer("initial_capital").notNull(),
  financialYearEnd: text("financial_year_end").notNull(),
  applicationStatus: text("application_status").notNull().default("pending"),
  estimatedCompletionDate: timestamp("estimated_completion_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
});

// Directors schema
export const directors = pgTable("directors", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull(),
  fullName: text("full_name").notNull(),
  idNumber: text("id_number").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

// Shareholders schema
export const shareholders = pgTable("shareholders", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull(),
  fullName: text("full_name").notNull(),
  idNumber: text("id_number").notNull(),
  sharePercentage: integer("share_percentage").notNull(),
  shareholderType: text("shareholder_type").notNull(),
});

// Address schema
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull(),
  streetAddress: text("street_address").notNull(),
  suburb: text("suburb"),
  city: text("city").notNull(),
  province: text("province").notNull(),
  postalCode: text("postal_code"),
  isPostalDifferent: boolean("is_postal_different").default(false),
  postalAddress: text("postal_address"),
  postalCity: text("postal_city"),
  postalProvince: text("postal_province"),
  postalPostalCode: text("postal_postal_code"),
});

// Documents schema
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull(),
  documentType: text("document_type").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  fileData: text("file_data").notNull(), // Base64 encoded data
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Application Status History
export const statusHistory = pgTable("status_history", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull(),
  status: text("status").notNull(),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Company Name Search
export const nameSearches = pgTable("name_searches", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  entityType: text("entity_type").notNull(),
  registrationNumber: text("registration_number"),
  isAvailable: boolean("is_available"),
  searchedAt: timestamp("searched_at").defaultNow().notNull(),
  userId: integer("user_id"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertCompanyRegistrationSchema = createInsertSchema(companyRegistrations).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true, 
  applicationStatus: true, 
  estimatedCompletionDate: true 
});
export const insertDirectorSchema = createInsertSchema(directors).omit({ id: true });
export const insertShareholderSchema = createInsertSchema(shareholders).omit({ id: true });
export const insertAddressSchema = createInsertSchema(addresses).omit({ id: true });
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, uploadedAt: true });
export const insertStatusHistorySchema = createInsertSchema(statusHistory).omit({ id: true, timestamp: true });
export const insertNameSearchSchema = createInsertSchema(nameSearches).omit({ 
  id: true, 
  searchedAt: true, 
  isAvailable: true 
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CompanyRegistration = typeof companyRegistrations.$inferSelect;
export type InsertCompanyRegistration = z.infer<typeof insertCompanyRegistrationSchema>;

export type Director = typeof directors.$inferSelect;
export type InsertDirector = z.infer<typeof insertDirectorSchema>;

export type Shareholder = typeof shareholders.$inferSelect;
export type InsertShareholder = z.infer<typeof insertShareholderSchema>;

export type Address = typeof addresses.$inferSelect;
export type InsertAddress = z.infer<typeof insertAddressSchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type StatusHistory = typeof statusHistory.$inferSelect;
export type InsertStatusHistory = z.infer<typeof insertStatusHistorySchema>;

export type NameSearch = typeof nameSearches.$inferSelect;
export type InsertNameSearch = z.infer<typeof insertNameSearchSchema>;

// Registration form schema with validation
export const registrationFormSchema = z.object({
  companyDetails: z.object({
    companyName: z.string().min(3, "Company name must be at least 3 characters").max(100),
    companyType: z.enum(["pvt", "plc", "partnership", "sole"], { 
      errorMap: () => ({ message: "Please select a company type" })
    }),
    businessActivity: z.string().min(1, "Please select a business activity"),
    businessDescription: z.string().min(10, "Please provide a detailed business description"),
    initialCapital: z.number().min(1, "Initial capital must be greater than 0"),
    financialYearEnd: z.string().min(1, "Please select a financial year end"),
  }),
  directors: z.array(
    z.object({
      fullName: z.string().min(3, "Full name is required"),
      idNumber: z.string().min(5, "Valid ID number is required"),
      email: z.string().email("Invalid email address"),
      phoneNumber: z.string().min(8, "Valid phone number is required"),
    })
  ).min(1, "At least one director is required"),
  shareholders: z.array(
    z.object({
      fullName: z.string().min(3, "Full name is required"),
      idNumber: z.string().min(5, "Valid ID number is required"),
      sharePercentage: z.number().min(1, "Share percentage must be between 1 and 100").max(100),
      shareholderType: z.enum(["individual", "company"], {
        errorMap: () => ({ message: "Please select shareholder type" })
      }),
    })
  ).min(1, "At least one shareholder is required"),
  address: z.object({
    streetAddress: z.string().min(5, "Street address is required"),
    suburb: z.string().optional(),
    city: z.string().min(1, "City/Town is required"),
    province: z.string().min(1, "Province is required"),
    postalCode: z.string().optional(),
    isPostalDifferent: z.boolean().default(false),
    postalAddress: z.string().optional(),
    postalCity: z.string().optional(),
    postalProvince: z.string().optional(),
    postalPostalCode: z.string().optional(),
  }),
  documents: z.object({
    cr1Form: z.any().optional(),
    constitution: z.any().optional(),
    directorIDs: z.any().optional(),
    proofOfAddress: z.any().optional(),
  }),
  termsAgree: z.boolean().refine(val => val === true, {
    message: "You must confirm that the information provided is accurate and complete"
  }),
  privacyAgree: z.boolean().refine(val => val === true, {
    message: "You must agree to the Privacy Policy and Terms of Service"
  }),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

// Name search form schema
export const nameSearchSchema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters"),
  entityType: z.string().min(1, "Please select an entity type"),
  registrationNumber: z.string().optional(),
});

export type NameSearchValues = z.infer<typeof nameSearchSchema>;

// Status tracking form schema
export const statusTrackingSchema = z.object({
  referenceNumber: z.string().min(5, "Please enter a valid reference number"),
});

export type StatusTrackingValues = z.infer<typeof statusTrackingSchema>;
