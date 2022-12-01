import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ArrowLeft, FloppyDisk } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../../components/Button";
import { Common } from "../../components/Common";
import { Divider } from "../../components/Divider";
import { FormField } from "../../components/Form/FormField";
import { api } from "../../lib/axios";

interface iSolicitationForm {
    patrimony: string;
    description: string;
}

export default function Form() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<iSolicitationForm>();

    const handleSend = handleSubmit(async (data: iSolicitationForm) => {
        if (!data.patrimony && !data.description) {
            toast.error("Por favor, preencha todos os campos!");
            return;
        }

        try {
            setIsLoading(true);

            const { "@help:user": user } = parseCookies(null);
            const parsedUser = JSON.parse(user);

            await api.post("/calls", {
                ...data,
                ownerId: parsedUser.id,
            });

            toast.success("Solicitação de chamado enviado com sucesso!");
            router.replace("/");
        } catch (err: any) {
            toast.error(
                "Não foi possível solicitar o chamado. Por favor, tente novamente mais tarde."
            );
        } finally {
            setIsLoading(false);
        }
    });

    function handleBack(event: FormEvent) {
        event.preventDefault();
        router.replace("/");
    }

    return (
        <Common title="RocketHelp - Novo Chamado">
            <Toaster />

            <span className="font-bold text-xl text-rocket-gray-100">
                Nova Solicitação
            </span>

            <Divider />

            <form onSubmit={handleSend} className="flex flex-col gap-4 w-full">
                <FormField.Root>
                    <FormField.Label
                        text="Número do Patrimônio:"
                        htmlForm="patrimony"
                    />
                    <FormField.Input
                        label="patrimony"
                        register={register}
                        placeholder="Digite o patrimônio"
                        type="text"
                    />
                </FormField.Root>

                <FormField.Root>
                    <FormField.Label
                        text="Descrição do problema:"
                        htmlForm="description"
                    />
                    <FormField.TextArea
                        label="description"
                        register={register}
                        placeholder="Faça uma descrição completa do problema..."
                    />
                </FormField.Root>

                <div className="flex items-center justify-center gap-3">
                    <Button color="red" onClick={handleBack}>
                        <ArrowLeft size={20} weight="bold" />
                        Voltar
                    </Button>
                    <Button color="green" type="submit" isLoading={isLoading}>
                        Enviar
                        <FloppyDisk size={20} weight="bold" />
                    </Button>
                </div>
            </form>
        </Common>
    );
}
