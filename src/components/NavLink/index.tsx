import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

type NavLinkProps = {
    label: string;
    link: string;
};

export function NavLink(props: NavLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={props.link}
            className={cx(
                "h-[72px] flex flex-col items-center justify-center group hover:cursor-pointer",
                {
                    "border-b-2 border-rocket-green-700":
                        router.pathname === props.link,
                }
            )}
        >
            <li
                className={cx(
                    "font-normal text-base text-white group-hover:text-rocket-purple-700",
                    {
                        "text-rocket-purple-700":
                            router.pathname === props.link,
                    }
                )}
            >
                {props.label}
            </li>
        </Link>
    );
}
