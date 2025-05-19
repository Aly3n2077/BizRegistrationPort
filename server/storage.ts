import { 
  users, type User, type InsertUser,
  companyRegistrations, type CompanyRegistration, type InsertCompanyRegistration,
  directors, type Director, type InsertDirector,
  shareholders, type Shareholder, type InsertShareholder,
  addresses, type Address, type InsertAddress,
  documents, type Document, type InsertDocument,
  statusHistory, type StatusHistory, type InsertStatusHistory,
  nameSearches, type NameSearch, type InsertNameSearch
} from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Company Registration methods
  getRegistration(id: number): Promise<CompanyRegistration | undefined>;
  getRegistrationByReference(reference: string): Promise<CompanyRegistration | undefined>;
  createRegistration(registration: InsertCompanyRegistration): Promise<CompanyRegistration>;
  updateRegistrationStatus(id: number, status: string): Promise<CompanyRegistration>;
  getAllRegistrations(): Promise<CompanyRegistration[]>;
  
  // Director methods
  getDirectorsByRegistration(registrationId: number): Promise<Director[]>;
  createDirector(director: InsertDirector): Promise<Director>;
  
  // Shareholder methods
  getShareholdersByRegistration(registrationId: number): Promise<Shareholder[]>;
  createShareholder(shareholder: InsertShareholder): Promise<Shareholder>;
  
  // Address methods
  getAddressByRegistration(registrationId: number): Promise<Address | undefined>;
  createAddress(address: InsertAddress): Promise<Address>;
  
  // Document methods
  getDocumentsByRegistration(registrationId: number): Promise<Document[]>;
  getDocumentByType(registrationId: number, type: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  
  // Status History methods
  getStatusHistoryByRegistration(registrationId: number): Promise<StatusHistory[]>;
  createStatusHistory(statusHistory: InsertStatusHistory): Promise<StatusHistory>;
  
  // Name Search methods
  searchCompanyName(nameSearch: InsertNameSearch): Promise<NameSearch>;
  checkNameAvailability(companyName: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private registrations: Map<number, CompanyRegistration>;
  private directors: Map<number, Director[]>;
  private shareholders: Map<number, Shareholder[]>;
  private addresses: Map<number, Address>;
  private documents: Map<number, Document[]>;
  private statusHistories: Map<number, StatusHistory[]>;
  private nameSearches: Map<number, NameSearch>;
  
  private currentUserId: number;
  private currentRegistrationId: number;
  private currentDirectorId: number;
  private currentShareholderId: number;
  private currentAddressId: number;
  private currentDocumentId: number;
  private currentStatusHistoryId: number;
  private currentNameSearchId: number;
  
  constructor() {
    this.users = new Map();
    this.registrations = new Map();
    this.directors = new Map();
    this.shareholders = new Map();
    this.addresses = new Map();
    this.documents = new Map();
    this.statusHistories = new Map();
    this.nameSearches = new Map();
    
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
    this.currentDirectorId = 1;
    this.currentShareholderId = 1;
    this.currentAddressId = 1;
    this.currentDocumentId = 1;
    this.currentStatusHistoryId = 1;
    this.currentNameSearchId = 1;
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  // Company Registration methods
  async getRegistration(id: number): Promise<CompanyRegistration | undefined> {
    return this.registrations.get(id);
  }
  
  async getRegistrationByReference(reference: string): Promise<CompanyRegistration | undefined> {
    return Array.from(this.registrations.values()).find(reg => reg.referenceNumber === reference);
  }
  
  async createRegistration(insertRegistration: InsertCompanyRegistration): Promise<CompanyRegistration> {
    const id = this.currentRegistrationId++;
    const referenceNumber = `ZW-CR-${new Date().getFullYear()}-${nanoid(5).toUpperCase()}`;
    const applicationStatus = "pending";
    const createdAt = new Date();
    const updatedAt = new Date();
    
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 15); // 15 days in the future
    const estimatedCompletionDate = estimatedDate;
    
    const registration: CompanyRegistration = { 
      ...insertRegistration, 
      id, 
      referenceNumber,
      applicationStatus,
      estimatedCompletionDate,
      createdAt, 
      updatedAt 
    };
    
    this.registrations.set(id, registration);
    
    // Initialize collections for this registration
    this.directors.set(id, []);
    this.shareholders.set(id, []);
    this.statusHistories.set(id, []);
    this.documents.set(id, []);
    
    // Create initial status history entry
    this.createStatusHistory({
      registrationId: id,
      status: "Application Received",
      description: "Your application has been successfully received and is pending review."
    });
    
    return registration;
  }
  
  async updateRegistrationStatus(id: number, status: string): Promise<CompanyRegistration> {
    const registration = await this.getRegistration(id);
    if (!registration) {
      throw new Error(`Registration with ID ${id} not found`);
    }
    
    const updatedRegistration: CompanyRegistration = {
      ...registration,
      applicationStatus: status,
      updatedAt: new Date()
    };
    
    this.registrations.set(id, updatedRegistration);
    return updatedRegistration;
  }
  
  async getAllRegistrations(): Promise<CompanyRegistration[]> {
    return Array.from(this.registrations.values());
  }
  
  // Director methods
  async getDirectorsByRegistration(registrationId: number): Promise<Director[]> {
    return this.directors.get(registrationId) || [];
  }
  
  async createDirector(insertDirector: InsertDirector): Promise<Director> {
    const id = this.currentDirectorId++;
    const director: Director = { ...insertDirector, id };
    
    const registrationDirectors = this.directors.get(insertDirector.registrationId) || [];
    registrationDirectors.push(director);
    this.directors.set(insertDirector.registrationId, registrationDirectors);
    
    return director;
  }
  
  // Shareholder methods
  async getShareholdersByRegistration(registrationId: number): Promise<Shareholder[]> {
    return this.shareholders.get(registrationId) || [];
  }
  
  async createShareholder(insertShareholder: InsertShareholder): Promise<Shareholder> {
    const id = this.currentShareholderId++;
    const shareholder: Shareholder = { ...insertShareholder, id };
    
    const registrationShareholders = this.shareholders.get(insertShareholder.registrationId) || [];
    registrationShareholders.push(shareholder);
    this.shareholders.set(insertShareholder.registrationId, registrationShareholders);
    
    return shareholder;
  }
  
  // Address methods
  async getAddressByRegistration(registrationId: number): Promise<Address | undefined> {
    return this.addresses.get(registrationId);
  }
  
  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const id = this.currentAddressId++;
    const address: Address = { ...insertAddress, id };
    this.addresses.set(insertAddress.registrationId, address);
    return address;
  }
  
  // Document methods
  async getDocumentsByRegistration(registrationId: number): Promise<Document[]> {
    return this.documents.get(registrationId) || [];
  }
  
  async getDocumentByType(registrationId: number, type: string): Promise<Document | undefined> {
    const docs = this.documents.get(registrationId) || [];
    return docs.find(doc => doc.documentType === type);
  }
  
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const uploadedAt = new Date();
    const document: Document = { ...insertDocument, id, uploadedAt };
    
    const registrationDocuments = this.documents.get(insertDocument.registrationId) || [];
    registrationDocuments.push(document);
    this.documents.set(insertDocument.registrationId, registrationDocuments);
    
    return document;
  }
  
  // Status History methods
  async getStatusHistoryByRegistration(registrationId: number): Promise<StatusHistory[]> {
    return this.statusHistories.get(registrationId) || [];
  }
  
  async createStatusHistory(insertStatusHistory: InsertStatusHistory): Promise<StatusHistory> {
    const id = this.currentStatusHistoryId++;
    const timestamp = new Date();
    const statusHistory: StatusHistory = { ...insertStatusHistory, id, timestamp };
    
    const registrationStatusHistories = this.statusHistories.get(insertStatusHistory.registrationId) || [];
    registrationStatusHistories.push(statusHistory);
    this.statusHistories.set(insertStatusHistory.registrationId, registrationStatusHistories);
    
    return statusHistory;
  }
  
  // Name Search methods
  async searchCompanyName(insertNameSearch: InsertNameSearch): Promise<NameSearch> {
    const id = this.currentNameSearchId++;
    const searchedAt = new Date();
    
    // Check if the name is available (for demo, assume most names are available)
    const isAvailable = await this.checkNameAvailability(insertNameSearch.companyName);
    
    const nameSearch: NameSearch = { 
      ...insertNameSearch, 
      id, 
      searchedAt,
      isAvailable 
    };
    
    this.nameSearches.set(id, nameSearch);
    return nameSearch;
  }
  
  async checkNameAvailability(companyName: string): Promise<boolean> {
    // For demo purposes, check if any existing registration has this name
    const existingRegistration = Array.from(this.registrations.values())
      .find(reg => reg.companyName.toLowerCase() === companyName.toLowerCase());
    
    // Also check in previous name searches that were found as unavailable
    const existingSearch = Array.from(this.nameSearches.values())
      .find(search => 
        search.companyName.toLowerCase() === companyName.toLowerCase() && 
        search.isAvailable === false
      );
    
    // Return true if the name is available (not found in existing registrations or marked as unavailable)
    return !existingRegistration && !existingSearch;
  }
}

import { DatabaseStorage } from "./database-storage";

// Comment out the in-memory storage
// export const storage = new MemStorage();

// Use database storage instead
export const storage = new DatabaseStorage();
