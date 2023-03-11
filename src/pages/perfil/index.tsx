import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { Avatar } from "../../components/Avatar";
import { Common } from "../../components/Common";
import { Divider } from "../../components/Divider";
import { Tabs } from "../../components/Tabs";
import { ChangePassword } from "../../features/ChangePassword";
import { UpdateUser } from "../../features/UpdateUser";

interface iUser {
    id: string;
    name: string;
    email: string;
}

type ProfileProps = {
    user: iUser;
};

export default function Profile(props: ProfileProps) {
    return (
        <Common title="RocketHelp - Perfil">
            <div className="grid grid-cols-3 gap-6 text-white">
                <div>
                    <div className="bg-rocket-gray-600 p-6 rounded-md">
                        <div className="flex flex-col items-center gap-0 mt-2">
                            <Avatar />
                            <span className="mt-1 bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-400 border border-violet-400">
                                Admin
                            </span>

                            <div className="mt-2 flex flex-col items-center">
                                <span className="text-white text-lg font-semibold">
                                    {props.user.name}
                                </span>
                                <span className="text-gray-500">
                                    {props.user.email}
                                </span>
                            </div>
                        </div>

                        <Divider />

                        <ul className="text-sm font-medium text-white uppercase">
                            <li className="py-2 flex items-center justify-between">
                                <span>Chamados Abertos</span>
                                <span className="mt-1 bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-400 border border-violet-400">
                                    2
                                </span>
                            </li>
                            <li className="py-2 flex items-center justify-between">
                                <span>Chamados Resolvidos</span>
                                <span className="mt-1 bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-400 border border-violet-400">
                                    18
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-span-2 flex flex-col gap-6">
                    {/* <Tabs.Root defaultValue="tab1">
                        <Tabs.List>
                            <Tabs.Trigger
                                value="tab1"
                                label="Meus Dados"
                                color="purple"
                            />
                            <Tabs.Trigger
                                value="tab2"
                                label="Trocar Senha"
                                color="purple"
                            />
                        </Tabs.List>
                        <Tabs.Content value="tab1">
                            <UpdateUser />
                        </Tabs.Content>
                        <Tabs.Content value="tab2">
                            <ChangePassword />
                        </Tabs.Content>
                    </Tabs.Root> */}

                    <UpdateUser />
                    <ChangePassword />
                </div>
            </div>
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

    const parsedUser: iUser = JSON.parse(user);

    return {
        props: {
            user: parsedUser,
        },
    };
};
