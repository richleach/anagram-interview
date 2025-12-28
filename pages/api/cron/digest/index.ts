// app/api/cron/digest/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust path to your prisma client instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1. Security Check
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).send('Unauthorized');
    }

    // 2. Fetch Data
    try {
        const totalUsers = await prisma.user.count();

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const newUsersCount = await prisma.user.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo
                }
            }
        });

        // 3. Log the "Email"
        console.log(`
      [CRON JOB] -- Weekly Digest Generated
      ---------------------------------------------------
      Total Users: ${totalUsers}
      New Users (Last 7 Days): ${newUsersCount}
      Status: All systems operational.
      ---------------------------------------------------
      `);

        // 4. Return Success
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Digest Job Failed:', error);
        return res.status(500).send('Internal Server Error');
    }
}