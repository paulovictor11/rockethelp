import logoHorizontal from "../../assets/logo-horizontal.svg";
import Image from "next/image";
import { NavLink } from "../NavLink";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Bell, SignOut } from "phosphor-react";
import { IconButton } from "../IconButton";
import { SearchInput } from "../../features/SearchInput";

export function Navbar() {
    const router = useRouter();

    function handleLogout() {
        destroyCookie(null, "@help:token");
        destroyCookie(null, "@help:user");
        router.replace("/");
    }

    return (
        <nav className="h-[140px] bg-rocket-gray-600 lg:h-[72px]">
            <div className="max-w-7xl mx-4 flex flex-col items-center justify-between lg:mx-8 xl:mx-auto lg:flex-row">
                <div className="flex items-center justify-between gap-6">
                    <Image
                        src={logoHorizontal}
                        alt="Logo Horizontal RocketHelp"
                    />
                    <ul className="flex items-center justify-between gap-6">
                        <NavLink label="Meus chamados" link="/" />
                        <NavLink label="Meu Perfil" link="/perfil" />
                    </ul>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <SearchInput />
                    <IconButton title="Notificações">
                        <Bell size={20} color="white" />
                    </IconButton>
                    <IconButton title="Sair" onClick={handleLogout}>
                        <SignOut size={20} color="white" />
                    </IconButton>
                </div>
            </div>
        </nav>
    );
}
