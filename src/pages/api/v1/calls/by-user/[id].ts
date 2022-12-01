import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { MissingParamError } from "../../../../../utils/errors/missing-param";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Only GET requests allowed" });
    }

    const id = req.query.id as string;

    try {
        const calls = await getCallsByUser(id);
        return res.json(calls);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function getCallsByUser(id: string) {
    if (!id) {
        throw new MissingParamError("id");
    }

    return await prisma.call.findMany({
        where: { ownerId: id },
    });
}
