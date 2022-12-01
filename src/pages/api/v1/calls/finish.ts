import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Only PUT requests allowed" });
    }

    try {
        await finishCall(req.body);
        return res.send({});
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function finishCall(requestBody: any) {
    const createCallBody = z.object({
        callId: z.string(),
    });

    const { callId } = createCallBody.parse(requestBody);

    await prisma.call.update({
        where: { id: callId },
        data: {
            status: "Finalizado",
        },
    });
}
