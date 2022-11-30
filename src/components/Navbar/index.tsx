import logoHorizontal from "../../assets/logo-horizontal.svg";
import Image from "next/image";
import { NavLink } from "../NavLink";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Bell, SignOut } from "phosphor-react";
import { Avatar } from "../Avatar";

export function Navbar() {
    const router = useRouter();

    function handleLogout() {
        destroyCookie(null, "@help:token");
        router.replace("/");
    }

    return (
        <nav className="h-[72px] bg-rocket-gray-600">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Image src={logoHorizontal} alt="Logo Horizontal RocketHelp" />

                <ul className="flex items-center justify-between gap-6">
                    <NavLink label="Meus chamados" link="/" />
                    <NavLink label="Outro link" link="/a" />
                </ul>

                <div className="flex items-center justify-between gap-2">
                    <div className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-rocket-gray-400 hover:cursor-pointer">
                        <Bell size={20} color="white" />
                    </div>

                    <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-rocket-gray-400 hover:cursor-pointer"
                        onClick={handleLogout}
                    >
                        <SignOut size={20} color="white" />
                    </div>

                    <Avatar />
                </div>
            </div>
        </nav>
    );
}
