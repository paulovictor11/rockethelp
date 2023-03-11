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
        <nav className="h-[72px] bg-rocket-gray-600">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <ul className="flex items-center justify-between gap-6">
                    <Image
                        src={logoHorizontal}
                        alt="Logo Horizontal RocketHelp"
                    />
                    <NavLink label="Meus chamados" link="/" />
                    <NavLink label="Meu Perfil" link="/perfil" />
                </ul>

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
