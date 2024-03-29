import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { Avatar } from "../../components/Avatar";
import { Common } from "../../components/Common";
import { Divider } from "../../components/Divider";
import { ChangePassword } from "../../features/ChangePassword";
import { UpdateUser } from "../../features/UpdateUser";
import { api } from "../../lib/axios";

interface iCall {
    id: string;
    patrimony: string;
    code: string;
    status: string;
    createdAt: string;
}

interface iUser {
    id: string;
    name: string;
    email: string;
}

type ProfileProps = {
    user: iUser;
    calls: iCall[];
};

export default function Profile(props: ProfileProps) {
    function lengthByStatus(status: string): number {
        const calls = props.calls.filter((item) => item.status === status);
        return calls.length;
    }

    return (
        <Common title="RocketHelp - Perfil">
            <div className="grid grid-cols-1 gap-6 text-white lg:grid-cols-3">
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
                                    {lengthByStatus("Em andamento")}
                                </span>
                            </li>
                            <li className="py-2 flex items-center justify-between">
                                <span>Chamados Resolvidos</span>
                                <span className="mt-1 bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-violet-400 border border-violet-400">
                                    {lengthByStatus("Finalizado")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-2">
                    <UpdateUser user={props.user} />
                    <ChangePassword userId={props.user.id} />
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
    const callResponse = await api.get<iCall[]>(
        `/calls/by-user/${parsedUser.id}`
    );

    return {
        props: {
            user: parsedUser,
            calls: callResponse.data,
        },
    };
};
