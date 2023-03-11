import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "../Navbar";

type CommonProps = {
    title: string;
    children: ReactNode;
};

export function Common(props: CommonProps) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            <main>
                <Navbar />

                <div className="max-w-7xl mx-auto my-10">{props.children}</div>
            </main>
        </>
    );
}
