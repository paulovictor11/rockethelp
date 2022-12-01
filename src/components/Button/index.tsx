import cx from "classnames";
import { CircleNotch } from "phosphor-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: "green" | "red" | "orange" | "purple";
    children: ReactNode;
    isLoading?: boolean;
};

export function Button({
    color,
    children,
    isLoading = false,
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            className={cx(
                "px-6 py-4 rounded font-bold text-sm text-white transition-colors flex items-center justify-center gap-2",
                {
                    "bg-rocket-green-500 hover:bg-rocket-green-700":
                        color === "green",
                    "bg-rocket-red-700 hover:bg-red-500": color === "red",
                    "bg-rocket-orange-700 hover:bg-rocket-green-500":
                        color === "orange",
                    "bg-rocket-purple-700 hover:bg-rocket-green-500":
                        color === "purple",
                }
            )}
        >
            {isLoading ? (
                <CircleNotch size={20} className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}
