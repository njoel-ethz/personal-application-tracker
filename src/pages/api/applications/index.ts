// pages/api/applications/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Application } from '@prisma/client';

const prisma = new PrismaClient();

type Data =
  | { message: string }
  | Application[]
  | Application;

// GET: fetch list of applications
// POST: create a new application

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = 1

  if (req.method === 'GET') {
    // Get list of applications
    try {
      const applications: Application[] = await prisma.application.findMany({
        where: { userId },
        orderBy: { applicationDate: 'desc' }, // Optional: Order by date
      });
      res.status(200).json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Failed to fetch applications.' });
    }
  } else if (req.method === 'POST') {
    // Create a new application
    const {
      companyName,
      position,
      applicationDate,
      status,
      contactName,
      contactEmail,
      notes,
    } = req.body;

    // Basic validation
    if (!companyName || !position || !applicationDate || !status) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    try {
      const newApplication: Application = await prisma.application.create({
        data: {
          companyName,
          position,
          applicationDate: new Date(applicationDate),
          status,
          contactName,
          contactEmail,
          notes,
          userId,
        },
      });
      res.status(201).json(newApplication);
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({ message: 'Failed to create application.' });
    }
  } else {
    // Defining allowed methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
