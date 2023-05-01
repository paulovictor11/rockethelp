import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoVertical from "../assets/logo-vertical.svg";
import { Button } from "../components/Button";

export default function Custom404() {
    return (
        <>
            <Head>
                <title>RocketHelp - Não encontrado</title>
            </Head>
            <div className="pt-36 h-screen flex flex-col items-center justify-start">
                <Image src={logoVertical} alt="Logo da RocketHelp" />

                <span className="mt-20 font-bold text-8xl text-rocket-purple-700">
                    404
                </span>
                <span className="font-semibold text-xl text-white">
                    A página que você procura não foi encontrada!
                </span>

                <div className="mt-10">
                    <Link href="/" replace>
                        <Button color="green">
                            Voltar para a página inicial
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
