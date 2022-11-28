import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import "../styles/global.css";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${roboto.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}
