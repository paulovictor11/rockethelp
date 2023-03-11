import { useRouter } from "next/router";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FormField } from "../../components/Form/FormField";

interface iFormSearch {
    search: string;
}

export function SearchInput() {
    const router = useRouter();

    const { register, handleSubmit } = useForm<iFormSearch>();

    const onSubmit = handleSubmit(async (data) => {
        if (!data.search) {
            toast.error("Por favor, preencha o campo de pesquisa.");
            return;
        }

        router.push(`/chamado/${data.search}`);
    });

    return (
        <form onSubmit={onSubmit}>
            <FormField.Root>
                <FormField.Input
                    isPrimary
                    label="search"
                    register={register}
                    placeholder="Pesquisar"
                    type="text"
                    rightIcon={
                        <MagnifyingGlass
                            size={20}
                            className="text-rocket-gray-300"
                        />
                    }
                />
            </FormField.Root>
        </form>
    );
}
