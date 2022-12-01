import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../../lib/prisma";
import { MissingParamError } from "../../../../utils/errors/missing-param";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const code = req.query.code as string;

    try {
        if (req.method === "PUT") {
            await putCall(code, req.body);
            return res.send({});
        }

        if (req.method === "DELETE") {
            await deleteCall(code);
            return res.send({});
        }

        const call = await getCall(code);
        return res.json(call);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function getCall(code: string) {
    if (!code) {
        throw new MissingParamError("code");
    }

    return await prisma.call.findUnique({
        where: { code },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            solution: true,
        },
    });
}

async function putCall(code: string, requestBody: any) {
    if (!code) {
        throw new MissingParamError("code");
    }

    const createCallBody = z.object({
        patrimony: z.string().min(6),
        description: z.string(),
    });

    const { patrimony, description } = createCallBody.parse(requestBody);

    await prisma.call.update({
        where: { code },
        data: {
            patrimony,
            description,
        },
    });
}

async function deleteCall(code: string) {
    if (!code) {
        throw new MissingParamError("code");
    }

    await prisma.call.delete({
        where: { code },
    });
}
