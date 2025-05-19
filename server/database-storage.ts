import { IStorage } from "./storage";
import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  companyRegistrations,
  directors,
  shareholders,
  addresses,
  documents,
  statusHistory,
  nameSearches,
  type User,
  type InsertUser,
  type CompanyRegistration,
  type InsertCompanyRegistration,
  type Director,
  type InsertDirector,
  type Shareholder,
  type InsertShareholder,
  type Address,
  type InsertAddress,
  type Document,
  type InsertDocument,
  type StatusHistory,
  type InsertStatusHistory,
  type NameSearch,
  type InsertNameSearch
} from "@shared/schema";
import { nanoid } from "nanoid";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Company Registration methods
  async getRegistration(id: number): Promise<CompanyRegistration | undefined> {
    const [registration] = await db.select().from(companyRegistrations).where(eq(companyRegistrations.id, id));
    return registration || undefined;
  }

  async getRegistrationByReference(reference: string): Promise<CompanyRegistration | undefined> {
    const [registration] = await db
      .select()
      .from(companyRegistrations)
      .where(eq(companyRegistrations.referenceNumber, reference));
    return registration || undefined;
  }

  async createRegistration(insertRegistration: InsertCompanyRegistration): Promise<CompanyRegistration> {
    // Generate a reference number if none is provided
    if (!insertRegistration.referenceNumber) {
      const referenceNumber = `ZBR-${nanoid(10).toUpperCase()}`;
      insertRegistration.referenceNumber = referenceNumber;
    }
    
    const [registration] = await db
      .insert(companyRegistrations)
      .values({
        ...insertRegistration,
        applicationStatus: "pending",
      })
      .returning();
    
    return registration;
  }

  async updateRegistrationStatus(id: number, status: string): Promise<CompanyRegistration> {
    const [updatedRegistration] = await db
      .update(companyRegistrations)
      .set({ 
        applicationStatus: status,
        updatedAt: new Date()
      })
      .where(eq(companyRegistrations.id, id))
      .returning();
    
    return updatedRegistration;
  }

  async getAllRegistrations(): Promise<CompanyRegistration[]> {
    return await db.select().from(companyRegistrations);
  }

  // Director methods
  async getDirectorsByRegistration(registrationId: number): Promise<Director[]> {
    return await db
      .select()
      .from(directors)
      .where(eq(directors.registrationId, registrationId));
  }

  async createDirector(insertDirector: InsertDirector): Promise<Director> {
    const [director] = await db
      .insert(directors)
      .values(insertDirector)
      .returning();
    
    return director;
  }

  // Shareholder methods
  async getShareholdersByRegistration(registrationId: number): Promise<Shareholder[]> {
    return await db
      .select()
      .from(shareholders)
      .where(eq(shareholders.registrationId, registrationId));
  }

  async createShareholder(insertShareholder: InsertShareholder): Promise<Shareholder> {
    const [shareholder] = await db
      .insert(shareholders)
      .values(insertShareholder)
      .returning();
    
    return shareholder;
  }

  // Address methods
  async getAddressByRegistration(registrationId: number): Promise<Address | undefined> {
    const [address] = await db
      .select()
      .from(addresses)
      .where(eq(addresses.registrationId, registrationId));
    
    return address || undefined;
  }

  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const [address] = await db
      .insert(addresses)
      .values(insertAddress)
      .returning();
    
    return address;
  }

  // Document methods
  async getDocumentsByRegistration(registrationId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.registrationId, registrationId));
  }

  async getDocumentByType(registrationId: number, type: string): Promise<Document | undefined> {
    const [document] = await db
      .select()
      .from(documents)
      .where(
        eq(documents.registrationId, registrationId)
      )
      .where(
        eq(documents.documentType, type)
      );
    
    return document || undefined;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [document] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    
    return document;
  }

  // Status History methods
  async getStatusHistoryByRegistration(registrationId: number): Promise<StatusHistory[]> {
    return await db
      .select()
      .from(statusHistory)
      .where(eq(statusHistory.registrationId, registrationId));
  }

  async createStatusHistory(insertStatusHistory: InsertStatusHistory): Promise<StatusHistory> {
    const [status] = await db
      .insert(statusHistory)
      .values(insertStatusHistory)
      .returning();
    
    return status;
  }

  // Name Search methods
  async searchCompanyName(insertNameSearch: InsertNameSearch): Promise<NameSearch> {
    // Algorithm to determine name availability
    const isAvailable = await this.checkNameAvailability(insertNameSearch.companyName);
    
    const [nameSearch] = await db
      .insert(nameSearches)
      .values({
        ...insertNameSearch,
        isAvailable
      })
      .returning();
    
    return nameSearch;
  }

  async checkNameAvailability(companyName: string): Promise<boolean> {
    // In a real system, this would check against existing company names
    // For this prototype, we'll use a simple algorithm
    const [existingCompany] = await db
      .select()
      .from(companyRegistrations)
      .where(eq(companyRegistrations.companyName, companyName));
    
    if (existingCompany) {
      return false;
    }
    
    // Example of other checks that could be performed:
    // - Check for similar names
    // - Check for restricted words
    // - Check for profanity
    
    // For now, we'll just return a simple random result
    return Math.random() > 0.3; // 70% chance of name being available
  }
}