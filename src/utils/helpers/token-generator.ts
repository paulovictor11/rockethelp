import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export interface iTokenGenerator {
    generate(id: string): Promise<string>;
    validate(token: string): Promise<void>;
}

export class TokenGenerator implements iTokenGenerator {
    async generate(id: string): Promise<string> {
        if (!id) {
            throw new Error("Missing param id");
        }

        return jwt.sign(id.toString(), process.env.JWT_SECRET!);
    }

    async validate(token: string): Promise<void> {
        if (!token) {
            throw new Error("Missing param token");
        }

        await jwt.verify(token, process.env.JWT_SECRET!);
        return;
    }
}
