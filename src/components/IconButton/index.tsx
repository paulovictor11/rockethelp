import { ReactNode } from "react";
import { Tooltip } from "../Tooltip";

type IconButtonProps = {
    children: ReactNode;
    title: string;
    onClick?: () => void;
};

export function IconButton(props: IconButtonProps) {
    return (
        <Tooltip text={props.title}>
            <div
                onClick={props.onClick}
                className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-rocket-gray-400 hover:cursor-pointer"
            >
                {props.children}
            </div>
        </Tooltip>
    );
}
