import logoHorizontal from "../../assets/logo-horizontal.svg";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "../NavLink";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Bell, MagnifyingGlass, SignOut } from "phosphor-react";
import { IconButton } from "../IconButton";

export function Navbar() {
    const router = useRouter();

    function handleLogout() {
        destroyCookie(null, "@help:token");
        router.replace("/");
    }

    return (
        <nav className="h-[72px] bg-rocket-gray-600">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="h-[72px] flex items-center">
                    <Image
                        src={logoHorizontal}
                        alt="Logo Horizontal RocketHelp"
                    />
                </Link>

                <ul className="flex items-center justify-between gap-6">
                    <NavLink label="Meus chamados" link="/" />
                    <NavLink label="Meu Perfil" link="/perfil" />
                </ul>

                <div className="flex items-center justify-between gap-2">
                    <IconButton title="Pesquisar">
                        <MagnifyingGlass size={20} color="white" />
                    </IconButton>
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
