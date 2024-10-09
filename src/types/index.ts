// types/index.ts

// Not needed if Prisma Types are sufficient
export interface Application {
    id: number;
    companyName: string;
    position: string;
    applicationDate: string; // ISO string
    status: string;
    contactName?: string;
    contactEmail?: string;
    notes?: string;
    userId: number;
    createdAt: string; // ISO string
  }
  
  export interface User {
    id: number;
    email: string;
    password: string;
    createdAt: string; // ISO string
}
  
// Space to declare further types used by the Frontend
  