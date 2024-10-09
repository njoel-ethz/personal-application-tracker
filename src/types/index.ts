// types/index.ts

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
  