# Zimbabwe Business Registration Portal

A premium web-based platform that streamlines the company registration process for Zimbabwean businesses. This application offers a comprehensive, user-friendly solution for entrepreneurs to navigate complex registration processes with an elegant, professional interface.

## Overview

The Zimbabwe Business Registration Portal is designed to simplify the company registration process in Zimbabwe by providing a digital platform that guides users through each step of registration. The system combines a sophisticated user interface with robust backend functionality to deliver a premium user experience.

## Features

### 1. Company Name Search and Availability Check
- Search for company name availability in real-time
- Results indicate whether the desired company name is available or already registered
- Support for different entity types (Private Limited Company, Public Limited Company, Partnership, Sole Proprietorship)

### 2. Multi-step Registration Process
- Step 1: Company Details - Submit basic information about the company
- Step 2: Directors Information - Add directors with their personal details
- Step 3: Address Information - Provide physical and postal addresses

### 3. Document Management
- Upload required documents for company registration
- Secure storage of uploaded files
- Document verification workflow

### 4. Registration Status Tracking
- Real-time updates on registration status
- Reference number generation for tracking applications
- Timeline visualization of registration progress

### 5. Premium User Experience
- Responsive design that works on all device sizes
- Interactive animations and hover effects
- Accessibility-focused implementation
- Light and dark mode support

## Technical Implementation

### Frontend
- **React**: Core UI library with functional components and hooks
- **Tailwind CSS**: Utility-first styling with custom design system
- **Motion Effects**: Framer Motion for smooth animations
- **Form Management**: React Hook Form with Zod validation
- **Interactive Elements**: Custom splash cursor effects, background animations
- **Theme Support**: Dark/light mode with seamless transitions

### Backend
- **Express.js**: Web server framework
- **PostgreSQL**: Database for persistent storage
- **Drizzle ORM**: Database schema management and querying
- **Session Management**: Express sessions with PostgreSQL store
- **API Architecture**: RESTful API endpoints
- **Validation**: Zod schema validation for API requests

### Key Components

#### UI Components
1. **Name Search Form**: Interactive form for checking company name availability
2. **Registration Form**: Multi-step form with progress tracking
3. **Status Tracker**: Visual representation of application status
4. **Document Upload**: Drag-and-drop file upload with preview
5. **FAQs Section**: Expandable accordion for frequently asked questions

#### Visual Features
1. **Glassmorphism Effects**: Frosted glass card styling for depth
2. **Gradient Colors**: Vibrant color scheme with gradient effects
3. **Animations**: Subtle motion effects for user interaction feedback
4. **Interactive Elements**: Hover effects and cursor interactions
5. **Responsive Layout**: Mobile-first design approach

#### Backend Services
1. **User Management**: Account creation and authentication
2. **Application Processing**: Step-by-step application handling
3. **Status Updates**: Real-time status change notifications
4. **Document Storage**: Secure file management
5. **Name Verification**: Business name availability checking against registry

## Database Schema

The application uses a PostgreSQL database with the following tables:

1. **users**: User accounts for applicants
2. **company_registrations**: Registration applications
3. **directors**: Company director information
4. **shareholders**: Company shareholder details
5. **addresses**: Physical and postal addresses
6. **documents**: Uploaded documents for verification
7. **status_history**: Historical record of status changes
8. **name_searches**: Record of name availability searches

## Color Scheme

The application uses a vibrant color palette:
- **Primary**: Vibrant blue (#1956E3) for main actions and emphasis
- **Secondary**: Rich purple (#7B3FE4) for supporting elements
- **Accent**: Vibrant pink (#E43F9A) for highlighting and attention
- **Additional accents**: Teal, orange, and green for variety
- **Text**: High-contrast dark gray and white for readable content

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npm run db:push`
5. Start the development server: `npm run dev`

## Design Philosophy

The application is inspired by government service portals like gov.uk and Singapore's business registration portal, with an emphasis on:

1. **Clarity**: Clear, straightforward language and layout
2. **Efficiency**: Streamlined processes with minimal steps
3. **Accessibility**: Designed for users of all abilities
4. **Trustworthiness**: Professional appearance to build user confidence
5. **Responsiveness**: Works seamlessly across all devices

## Key Interactions

1. **Company Name Search**: Users enter a desired company name and entity type, receiving immediate feedback on availability
2. **Registration Form**: Step-by-step guided process with data validation at each stage
3. **Document Upload**: Secure, intuitive interface for uploading required documents
4. **Status Checking**: Simple reference number lookup to track application progress
5. **FAQ Interaction**: Expandable question/answer format with categorized information

## Future Enhancements

1. **Payment Integration**: Online payment for registration fees
2. **Digital Certificate Delivery**: Email delivery of registration certificates
3. **API Integrations**: Connect with other government services
4. **Mobile Application**: Native mobile apps for Android and iOS
5. **Advanced Analytics**: Dashboard for administrators with analytics

---

© 2025 Zimbabwe Business Registration Portal. All rights reserved.