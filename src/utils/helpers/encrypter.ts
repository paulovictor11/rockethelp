import bcrypt from "bcryptjs";

export interface iEncrypter {
    compare(value: string, hash: string): Promise<boolean>;
    encrypt(value: string): Promise<string>;
}

export class Encrypter implements iEncrypter {
    async compare(value: string, hash: string): Promise<boolean> {
        if (!value) {
            throw new Error("Missing param value");
        }

        if (!hash) {
            throw new Error("Missing param hash");
        }

        return await bcrypt.compare(value, hash);
    }

    async encrypt(value: string): Promise<string> {
        if (!value) {
            throw new Error("Missing param value");
        }

        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(value, salt);
    }
}
