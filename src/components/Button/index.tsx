import { CircleNotch } from "phosphor-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    // color: "rocket-green" | "rocket-red" | "rocket-orange" | "rocket-purple";
    children: ReactNode;
    isLoading?: boolean;
};

export function Button({ children, isLoading = false, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className="px-6 py-4 rounded font-bold text-sm text-white transition-colors flex items-center justify-center gap-2 bg-rocket-green-700 hover:bg-rocket-green-500"
        >
            {isLoading ? (
                <CircleNotch size={20} className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}
