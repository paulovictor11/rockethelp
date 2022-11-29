import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { MissingParamError } from "../../../../utils/errors/missing-param";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id as string;

    try {
        if (req.method === "PUT") {
            await putUser(id, req.body);
            return res.status(201).send({});
        }

        if (req.method === "DELETE") {
            await deleteUser(id);
            return res.send({});
        }

        const users = await getUser(id);
        return res.json(users);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function getUser(id: string) {
    if (!id) {
        throw new MissingParamError("id");
    }

    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
}

async function putUser(id: string, requestBody: any) {
    if (!id) {
        throw new MissingParamError("id");
    }

    const createUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
    });

    const { name, email } = createUserBody.parse(requestBody);

    await prisma.user.update({
        where: { id },
        data: { name, email },
    });
}

async function deleteUser(id: string) {
    if (!id) {
        throw new MissingParamError("id");
    }

    await prisma.user.delete({
        where: { id },
    });
}
