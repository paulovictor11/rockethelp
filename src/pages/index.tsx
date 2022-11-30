import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { Button } from "../components/Button";
import { Common } from "../components/Common";
import { Divider } from "../components/Divider";
import { Tabs } from "../components/Tabs";

export default function Home() {
    return (
        <Common title="RocketHelp - Meus Chamados">
            <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-rocket-gray-100">
                    Solicitações:{" "}
                    <span className="font-normal text-base text-rocket-gray-200">
                        0
                    </span>
                </span>

                <Button>Nova solicitação</Button>
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
                    <span className="text-white">aaaaaa</span>
                </Tabs.Content>
                <Tabs.Content value="tab2">
                    <span className="text-white">bbbbbbb</span>
                </Tabs.Content>
            </Tabs.Root>
        </Common>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { "@help:token": token } = parseCookies(context);
    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
