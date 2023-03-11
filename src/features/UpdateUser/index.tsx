import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { FormField } from "../../components/Form/FormField";
import { api } from "../../lib/axios";

interface iFormUser {
    name: string;
    email: string;
}

type UpdateUserProps = {
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export function UpdateUser(props: UpdateUserProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<iFormUser>();

    const onSubmit = handleSubmit(async (data) => {
        if (!data.email && !data.email) {
            toast.error("Por favor, preencha todos os campos!");
            return;
        }

        try {
            setIsLoading(true);

            await api.put(`/users/${props.user.id}`, data);

            toast.success("Dados alterados com sucesso!");
        } catch (_) {
            toast.error("Ocorreu um erro ao tentar atualizar os dados.");
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="bg-rocket-gray-600 p-6 rounded-md">
            <span className="font-bold text-xl text-rocket-gray-100">
                Alterar Dados
            </span>

            <Divider />

            <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
                <FormField.Root>
                    <FormField.Label text="Nome Completo:" htmlForm="name" />
                    <FormField.Input
                        label="name"
                        placeholder="Digite seu nome"
                        type="text"
                        register={register}
                        value={props.user.name}
                        isPrimary
                    />
                </FormField.Root>

                <FormField.Root>
                    <FormField.Label text="E-mail:" htmlForm="email" />
                    <FormField.Input
                        label="email"
                        placeholder="Digite seu e-mail"
                        type="text"
                        register={register}
                        value={props.user.email}
                        isPrimary
                    />
                </FormField.Root>

                <div className="flex items-center justify-center gap-3">
                    <Button color="green" type="submit" isLoading={isLoading}>
                        <FloppyDisk size={20} weight="bold" />
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}
