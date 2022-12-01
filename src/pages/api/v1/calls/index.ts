import ShortUniqueId from "short-unique-id";
import prisma from "../../../../lib/prisma";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            await postCalls(req.body);
            return res.status(201).send({});
        }

        const calls = await getCalls();
        return res.json(calls);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function getCalls() {
    return await prisma.call.findMany({
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}

async function postCalls(requestBody: any) {
    const createCallBody = z.object({
        patrimony: z.string().min(6),
        description: z.string(),
        ownerId: z.string(),
    });

    const { patrimony, description, ownerId } =
        createCallBody.parse(requestBody);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.call.create({
        data: {
            patrimony,
            description,
            code,
            ownerId,
        },
    });
}
