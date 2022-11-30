import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try {
        await addSolution(req.body);
        return res.send({});
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function addSolution(requestBody: any) {
    const createSolutionBody = z.object({
        description: z.string(),
        callId: z.string(),
    });

    const { description, callId } = createSolutionBody.parse(requestBody);

    await prisma.solution.create({
        data: {
            description,
            callId,
        },
    });
}
