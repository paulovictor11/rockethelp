import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../../lib/prisma";
import { UniqueEmailError } from "../../../../utils/errors/unique-email";
import { Encrypter } from "../../../../utils/helpers/encrypter";

const encrypter = new Encrypter();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            await postUsers(req.body);
            return res.status(201).send({});
        }

        const users = await getUsers();
        return res.json(users);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function getUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
}

async function postUsers(requestBody: any) {
    const createUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    });

    const { name, email, password } = createUserBody.parse(requestBody);
    const isUserAlreadyExists = await prisma.user.findUnique({
        where: { email },
    });

    if (isUserAlreadyExists) {
        throw new UniqueEmailError();
    }

    const hashedPassword = await encrypter.encrypt(password);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
}
