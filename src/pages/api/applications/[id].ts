// pages/api/applications/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Application } from '@prisma/client';

const prisma = new PrismaClient();

type Data =
  | { message: string }
  | Application;

// GET: fetch a single application
// PUT: update an application
// DELETE: delete an application

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const userId = 1

    const { id } = req.query;
    const applicationId = Number(id);

    if (isNaN(applicationId)) {
        res.status(400).json({ message: 'Invalid application ID.' });
        return;
    }

    if (req.method === 'GET') {
        // Get a single application
        try {
            const application: Application | null = await prisma.application.findFirst({
                where: { id: applicationId, userId },
            });

            if (!application) {
                res.status(404).json({ message: 'Application not found.' });
                return;
            }

            res.status(200).json(application);
        } catch (error) {
            console.error('Error fetching application:', error);
            res.status(500).json({ message: 'Failed to fetch application.' });
        }
    } else if (req.method === 'PUT') {
        // Update an application
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
            const updatedApplication: Application = await prisma.application.update({
                where: { id: applicationId },
                data: {
                    companyName,
                    position,
                    applicationDate: new Date(applicationDate),
                    status,
                    contactName,
                    contactEmail,
                    notes,
                },
            });

            res.status(200).json({ message: 'Application updated successfully.' });
        } catch (error) {
            console.error('Error updating application:', error);
            res.status(500).json({ message: 'Failed to update application.' });
        }
    } else if (req.method === 'DELETE') {
        // Delete an application
        try {
            await prisma.application.delete({
                where: { id: applicationId },
            });

            res.status(200).json({ message: 'Application deleted successfully.' });
        } catch (error) {
            console.error('Error deleting application:', error);
            res.status(500).json({ message: 'Failed to delete application.' });
        }
    } else {
        // Define allowed methods
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
