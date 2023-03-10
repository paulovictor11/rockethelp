import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { FormField } from "../../components/Form/FormField";

interface iFormUser {
    name: string;
    email: string;
}

export function UpdateUser() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<iFormUser>();

    return (
        <div className="bg-rocket-gray-600 p-6 rounded-md">
            <span className="font-bold text-xl text-rocket-gray-100">
                Alterar Dados
            </span>

            <Divider />

            <form className="flex flex-col gap-4 w-full">
                <FormField.Root>
                    <FormField.Label text="Nome Completo:" htmlForm="name" />
                    <FormField.Input
                        label="name"
                        placeholder="Digite seu nome"
                        type="text"
                        register={register}
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
                        isPrimary
                    />
                </FormField.Root>

                <div className="flex items-center justify-center gap-3">
                    <Button color="green" type="submit" isLoading={isLoading}>
                        Salvar
                        <FloppyDisk size={20} weight="bold" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
