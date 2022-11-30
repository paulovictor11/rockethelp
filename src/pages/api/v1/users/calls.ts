import prisma from "../../../../lib/prisma";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import { MissingParamError } from "../../../../utils/errors/missing-param";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Only GET requests allowed" });
    }

    const { "@help:user": user } = parseCookies(null);
    const parsedUser = JSON.parse(user) as User;

    try {
        const calls = await getCallsByUser(parsedUser.id);
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
