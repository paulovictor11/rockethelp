import prisma from "../../../../lib/prisma";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { MissingParamError } from "../../../../utils/errors/missing-param";
import { Encrypter } from "../../../../utils/helpers/encrypter";
import { NotFoundError } from "../../../../utils/errors/not-found";

const encrypter = new Encrypter();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Only PUT requests allowed" });
    }

    try {
        await updatePassword(req.body);
        return res.send({});
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function updatePassword(requestBody: any) {
    const createUpdatePasswordBody = z.object({
        id: z.string(),
        password: z.string().min(8),
    });

    const { id, password } = createUpdatePasswordBody.parse(requestBody);

    if (!id) {
        throw new MissingParamError("id");
    }

    const doesUserExists = await prisma.user.findUnique({
        where: { id },
    });

    if (!doesUserExists) {
        throw new NotFoundError("user");
    }

    const hashedPassword = await encrypter.encrypt(password);

    await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
}
