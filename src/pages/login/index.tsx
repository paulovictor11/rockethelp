import logoVertical from "../../assets/logo-vertical.svg";
import Image from "next/image";
import { FormField } from "../../components/Form/FormField";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Envelope, Key } from "phosphor-react";
import { toast } from "react-hot-toast";
import { api } from "../../lib/axios";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface iLoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

const createLoginFormSchema = z.object({
    email: z
        .string()
        .nonempty("O e-mail é obrigatório")
        .email("Formato de e-mail inválido"),
    password: z
        .string()
        .nonempty("A senha é obrigatória")
        .min(8, "A senha precisa de no mínimo 6 caracteres"),
});

type CreateLoginFormData = z.infer<typeof createLoginFormSchema>;

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateLoginFormData>({
        resolver: zodResolver(createLoginFormSchema),
    });

    const handleLogin = handleSubmit(async (formData: CreateLoginFormData) => {
        try {
            setIsLoading(true);

            const {
                data: { token, user },
            } = await api.post<iLoginResponse>("/login", formData);

            setCookie(null, "@help:token", token, {
                maxAge: 5 * 24 * 60 * 60,
                path: "/",
            });

            setCookie(null, "@help:user", JSON.stringify(user), {
                maxAge: 5 * 24 * 60 * 60,
                path: "/",
            });

            router.replace("/");
        } catch (err: any) {
            toast.error("Credenciais Inválidas");
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <main className="h-screen bg-rocket-gray-600">
            <div className="max-w-md mx-4 pt-32 sm:mx-auto">
                <Image
                    src={logoVertical}
                    alt="Logo Vertical RocketHelp"
                    className="mx-auto"
                />

                <div className="bg-rocket-gray-500 p-6 rounded-md mt-20 shadow-md">
                    <h1 className="font-bold text-xl text-center text-rocket-gray-100">
                        Acesse sua conta
                    </h1>

                    <form
                        onSubmit={handleLogin}
                        className="mt-6 flex flex-col gap-4"
                    >
                        <FormField.Root>
                            <FormField.Input
                                isPrimary
                                label="email"
                                register={register}
                                placeholder="E-mail"
                                type="email"
                                icon={
                                    <Envelope
                                        size={20}
                                        className="text-rocket-gray-300"
                                    />
                                }
                            />
                            {errors.email ? (
                                <FormField.Message
                                    content={errors.email.message}
                                />
                            ) : null}
                        </FormField.Root>

                        <FormField.Root>
                            <FormField.Input
                                isPrimary
                                label="password"
                                register={register}
                                placeholder="Senha"
                                type="password"
                                icon={
                                    <Key
                                        size={20}
                                        className="text-rocket-gray-300"
                                    />
                                }
                            />
                            {errors.password ? (
                                <FormField.Message
                                    content={errors.password.message}
                                />
                            ) : null}
                        </FormField.Root>

                        <Button
                            color="green"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
