import logoVertical from "../../assets/logo-vertical.svg";
import Image from "next/image";
import { FormField } from "../../components/Form/FormField";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Envelope, Key } from "phosphor-react";
import { Toaster, toast } from "react-hot-toast";
import { api } from "../../lib/axios";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

interface iLoginForm {
    email: string;
    password: string;
}

interface iLoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<iLoginForm>();

    const handleLogin = handleSubmit(async (formData: iLoginForm) => {
        if (!formData.email && !formData.password) {
            toast.error("Por favor, preencha todos os campos!");
            return;
        }

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
            <Toaster />
            <div className="max-w-md mx-auto pt-32">
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
