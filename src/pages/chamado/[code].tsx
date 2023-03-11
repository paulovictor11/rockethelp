import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import {
    ArrowLeft,
    CircleWavyCheck,
    ClipboardText,
    DesktopTower,
    FloppyDisk,
} from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import { CallBadge } from "../../components/CallBadge";
import { CallDetailCard } from "../../components/CallDetailCard";
import { Common } from "../../components/Common";
import { Divider } from "../../components/Divider";
import { FormField } from "../../components/Form/FormField";
import { api } from "../../lib/axios";

interface iSolutionForm {
    description: string;
}

interface iUser {
    id: string;
    name: string;
    email: string;
}

interface iSolution {
    id: string;
    description: string;
    createdAt: string;
}

interface iCall {
    id: string;
    patrimony: string;
    description: string;
    code: string;
    status: string;
    createdAt: string;
    owner: iUser;
    solution: iSolution;
}

type CallProps = {
    call: iCall;
};

export default function Call(props: CallProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, getValues } = useForm<iSolutionForm>();

    async function handleSubmit() {
        const callId = props.call.id;
        const { description } = getValues();

        if (!description) {
            toast.error("Por favor, preencha todos os campos!");
        }

        try {
            setIsLoading(true);

            await api.post("/solutions", { description, callId });
            await api.put("/calls/finish", { callId });

            toast.success("Chamado finalizado com sucesso!");

            router.reload();
        } catch (err: any) {
            toast.error("Credenciais Inválidas");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Common title={`RocketHelp - Chamado #${props.call.code}`}>
            <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-rocket-gray-100">
                    Solicitação:{" "}
                    <span className="font-normal text-base text-rocket-gray-200">
                        {"#"}
                        {props.call.code}
                    </span>
                </span>

                <CallBadge call={props.call} />
            </div>

            <Divider />

            <div className="flex flex-col gap-5">
                <CallDetailCard.Root>
                    <CallDetailCard.Title
                        text="Equipamento"
                        icon={
                            <DesktopTower
                                size={18}
                                className="text-rocket-purple-700"
                            />
                        }
                    />
                    <CallDetailCard.Content>
                        Patrimônio {"#"}
                        {props.call.code}
                    </CallDetailCard.Content>
                </CallDetailCard.Root>

                <CallDetailCard.Root>
                    <CallDetailCard.Title
                        text="Descrição do problema"
                        icon={
                            <ClipboardText
                                size={18}
                                className="text-rocket-purple-700"
                            />
                        }
                    />
                    <CallDetailCard.Content>
                        {props.call.description}
                    </CallDetailCard.Content>
                    <CallDetailCard.Date dateTime={props.call.createdAt} />
                </CallDetailCard.Root>

                <CallDetailCard.Root>
                    <CallDetailCard.Title
                        text="Solução"
                        icon={
                            <CircleWavyCheck
                                size={18}
                                className="text-rocket-purple-700"
                            />
                        }
                    />
                    <CallDetailCard.Content>
                        {props.call.solution ? (
                            <>{props.call.solution.description}</>
                        ) : (
                            <FormField.TextArea
                                isPrimary
                                label="description"
                                placeholder="Descrição da Solução"
                                register={register}
                            />
                        )}
                    </CallDetailCard.Content>
                    {props.call.solution ? (
                        <CallDetailCard.Date
                            dateTime={props.call.solution.createdAt}
                        />
                    ) : null}
                </CallDetailCard.Root>

                <div className="flex items-center justify-center gap-3">
                    <Button color="red" onClick={() => router.replace("/")}>
                        <ArrowLeft size={20} weight="bold" />
                        Voltar
                    </Button>
                    {!props.call.solution ? (
                        <Button
                            color="green"
                            isLoading={isLoading}
                            onClick={handleSubmit}
                        >
                            Finalizar
                            <FloppyDisk size={20} weight="bold" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </Common>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const code = context.query.code;
    const callResponse = await api.get(`/calls/${code}`);

    if (!callResponse.data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            call: callResponse.data,
        },
    };
};
