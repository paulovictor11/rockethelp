import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { MissingParamError } from "../../../../utils/errors/missing-param";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Only PUT requests allowed" });
    }

    const code = req.query.code as string;

    try {
        await finishCall(code);
        return res.send({});
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function finishCall(code: string) {
    if (!code) {
        throw new MissingParamError("code");
    }

    await prisma.call.update({
        where: { code },
        data: {
            status: "Finalizado",
        },
    });
}
