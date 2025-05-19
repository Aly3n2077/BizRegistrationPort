import { db } from "../server/db";
import { users, companyRegistrations, directors, shareholders, addresses, documents, statusHistory, nameSearches } from "../shared/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

// Seed function to populate the database with initial data
async function seed() {
  try {
    console.log("Starting to seed database...");

    // Create admin user
    const [adminUser] = await db
      .insert(users)
      .values({
        username: "admin",
        password: "admin123", // In a real app, this would be hashed
        email: "admin@zbregister.gov.zw",
        fullName: "System Administrator",
        phoneNumber: "+263777777777"
      })
      .returning()
      .onConflictDoNothing({ target: users.username });

    console.log("Admin user created:", adminUser?.id);

    // Create test user
    const [testUser] = await db
      .insert(users)
      .values({
        username: "testuser",
        password: "password123", // In a real app, this would be hashed
        email: "test@example.com",
        fullName: "Test User",
        phoneNumber: "+263712345678"
      })
      .returning()
      .onConflictDoNothing({ target: users.username });

    console.log("Test user created:", testUser?.id);

    // If we have the test user, create sample registration
    if (testUser) {
      // Check if the company already exists
      const existingCompany = await db
        .select()
        .from(companyRegistrations)
        .where(eq(companyRegistrations.companyName, "Sunrise Innovations"))
        .limit(1);

      if (existingCompany.length === 0) {
        // Create a sample company registration
        const [registration] = await db
          .insert(companyRegistrations)
          .values({
            referenceNumber: `ZBR-${nanoid(10).toUpperCase()}`,
            companyName: "Sunrise Innovations",
            companyType: "pvt",
            businessActivity: "technology",
            businessDescription: "Software development and IT services for businesses across Zimbabwe",
            initialCapital: 5000,
            financialYearEnd: "12-31",
            userId: testUser.id,
            applicationStatus: "pending",
            estimatedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
          })
          .returning();

        console.log("Sample registration created:", registration.id);

        // Create director
        await db
          .insert(directors)
          .values({
            registrationId: registration.id,
            fullName: "John Doe",
            idNumber: "ZW123456789",
            email: "john@example.com",
            phoneNumber: "+263712345678"
          })
          .returning();

        // Create shareholder
        await db
          .insert(shareholders)
          .values({
            registrationId: registration.id,
            fullName: "John Doe",
            idNumber: "ZW123456789",
            sharePercentage: 100,
            shareholderType: "individual"
          })
          .returning();

        // Create address
        await db
          .insert(addresses)
          .values({
            registrationId: registration.id,
            streetAddress: "123 Main St",
            suburb: "Avondale",
            city: "Harare",
            province: "Harare",
            postalCode: "00263"
          })
          .returning();

        // Create status history
        await db
          .insert(statusHistory)
          .values({
            registrationId: registration.id,
            status: "submitted",
            description: "Application received and under initial review"
          })
          .returning();

        await db
          .insert(statusHistory)
          .values({
            registrationId: registration.id,
            status: "pending",
            description: "Application being processed by registrar"
          })
          .returning();

        console.log("Added directors, shareholders, address, and status history");
      } else {
        console.log("Sample company already exists, skipping creation");
      }

      // Create a name search
      await db
        .insert(nameSearches)
        .values({
          companyName: "Tech Innovators",
          entityType: "pvt",
          userId: testUser.id,
          isAvailable: true
        })
        .onConflictDoNothing()
        .returning();

      console.log("Added name search record");
    }

    console.log("Database seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();