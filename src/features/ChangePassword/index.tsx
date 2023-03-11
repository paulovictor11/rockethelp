import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { FormField } from "../../components/Form/FormField";
import { api } from "../../lib/axios";
interface iFormPassword {
    password: string;
    confirm_password: string;
}

type ChangePasswordProps = {
    userId: string;
};

export function ChangePassword(props: ChangePasswordProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<iFormPassword>();

    const onSubmit = handleSubmit(async (data) => {
        if (!data.password && !data.confirm_password) {
            toast.error("Por favor, preencha todos os campos!");
            return;
        }

        if (data.password !== data.confirm_password) {
            toast.error("Senhas informadas não são iguais!");
            return;
        }

        try {
            setIsLoading(true);

            const formData = {
                id: props.userId,
                password: data.password,
            };

            await api.put(`/users/${props.userId}`, formData);

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
                Alterar Senha
            </span>

            <Divider />

            <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
                <FormField.Root>
                    <FormField.Label text="Nova Senha:" htmlForm="password" />
                    <FormField.Input
                        label="password"
                        placeholder="Digite a nova senha"
                        type="text"
                        register={register}
                        isPrimary
                    />
                </FormField.Root>

                <FormField.Root>
                    <FormField.Label
                        text="Confirmar senha:"
                        htmlForm="confirm_password"
                    />
                    <FormField.Input
                        label="confirm_password"
                        placeholder="Digite a mesma senha"
                        type="text"
                        register={register}
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
