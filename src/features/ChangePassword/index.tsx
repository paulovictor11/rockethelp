import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { FormField } from "../../components/Form/FormField";

interface iFormPassword {
    password: string;
    confirm_password: string;
}

export function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<iFormPassword>();

    return (
        <div className="bg-rocket-gray-600 p-6 rounded-md">
            <span className="font-bold text-xl text-rocket-gray-100">
                Alterar Senha
            </span>

            <Divider />

            <form className="flex flex-col gap-4 w-full">
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
                        Salvar
                        <FloppyDisk size={20} weight="bold" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
