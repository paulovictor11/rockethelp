import { Head, Html, Main, NextScript } from "next/document";
import { Toaster } from "react-hot-toast";

export default function Document() {
    return (
        <Html>
            <Head></Head>
            <body className="bg-rocket-gray-700">
                <Main />
                <NextScript />
                <Toaster />
            </body>
        </Html>
    );
}
