// pages/api/applications/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Application } from '@prisma/client';
import { Application as AppType } from '../../../types';

const prisma = new PrismaClient();

type Data =
  | { message: string }
  | Application[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const applications: Application[] = await prisma.application.findMany({
        where: { userId },
      });
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch applications.' });
    }
  } else if (req.method === 'POST') {
    const {
      companyName,
      position,
      applicationDate,
      status,
      contactName,
      contactEmail,
      notes,
    }: Partial<AppType> = req.body;

    // Validate required fields
    if (!companyName || !position || !applicationDate || !status) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    try {
      const newApplication = await prisma.application.create({
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
      res.status(500).json({ message: 'Failed to create application.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
