import prisma from "../../../../lib/prisma";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { Encrypter } from "../../../../utils/helpers/encrypter";
import { TokenGenerator } from "../../../../utils/helpers/token-generator";
import { InvalidCredentialsError } from "../../../../utils/errors/invalid-credentials";

const encrypter = new Encrypter();
const tokenGenerator = new TokenGenerator();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try {
        const response = await login(req.body);
        return res.json(response);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message ?? "Unexpected Error",
        });
    }
}

async function login(requestBody: any) {
    const createLoginBody = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    const { email, password } = createLoginBody.parse(requestBody);
    const doesUserExists = await prisma.user.findUnique({
        where: { email },
    });

    if (!doesUserExists) {
        throw new InvalidCredentialsError();
    }

    const isPasswordValid = await encrypter.compare(
        password,
        doesUserExists.password
    );
    if (!isPasswordValid) {
        throw new InvalidCredentialsError();
    }

    const token = await tokenGenerator.generate(doesUserExists.id);

    return {
        token,
        user: {
            id: doesUserExists.id,
            name: doesUserExists.name,
            email: doesUserExists.email,
        },
    };
}
