import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Button } from "../components/Button";
import { Common } from "../components/Common";
import { Divider } from "../components/Divider";
import { Tabs } from "../components/Tabs";
import { CallList } from "../features/CallList";
import { api } from "../lib/axios";

interface iCall {
    id: string;
    patrimony: string;
    code: string;
    status: string;
    createdAt: string;
}

type HomeProps = {
    calls: iCall[];
};

export default function Home(props: HomeProps) {
    const router = useRouter();

    function mountListByStatus(status: string): iCall[] {
        if (!props.calls.length) {
            return [] as iCall[];
        }

        return props.calls.filter((item) => item.status === status);
    }

    return (
        <Common title="RocketHelp - Meus Chamados">
            <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-rocket-gray-100">
                    Solicitações:{" "}
                    <span className="font-normal text-base text-rocket-gray-200">
                        0
                    </span>
                </span>

                <Button
                    color="green"
                    onClick={() => router.push("/formulario")}
                >
                    Nova solicitação
                </Button>
            </div>

            <Divider />

            <Tabs.Root defaultValue="tab1">
                <Tabs.List>
                    <Tabs.Trigger
                        value="tab1"
                        label="Em andamento"
                        color="orange"
                    />
                    <Tabs.Trigger
                        value="tab2"
                        label="Finalizados"
                        color="green"
                    />
                </Tabs.List>
                <Tabs.Content value="tab1">
                    <CallList data={mountListByStatus("Em andamento")} />
                </Tabs.Content>
                <Tabs.Content value="tab2">
                    <CallList data={mountListByStatus("Finalizado")} />
                </Tabs.Content>
            </Tabs.Root>
        </Common>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { "@help:token": token, "@help:user": user } = parseCookies(context);
    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const parsedUser = JSON.parse(user);
    const callResponse = await api.get<iCall[]>(
        `/calls/by-user/${parsedUser.id}`
    );

    return {
        props: {
            calls: callResponse.data,
        },
    };
};
