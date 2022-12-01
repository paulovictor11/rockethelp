import cx from "classnames";
import { CircleWavyCheck, Hourglass } from "phosphor-react";

interface iCall {
    id: string;
    patrimony: string;
    code: string;
    status: string;
    createdAt: string;
}

type CallBadgeProps = {
    call: iCall;
};

export function CallBadge(props: CallBadgeProps) {
    return (
        <div className="bg-rocket-gray-500 py-2 px-8 rounded flex items-center justify-center gap-3">
            {props.call.status == "Em andamento" ? (
                <Hourglass size={18} className="text-rocket-orange-700" />
            ) : (
                <CircleWavyCheck size={18} className="text-rocket-green-300" />
            )}
            <span
                className={cx("font-bold text-sm", {
                    "text-rocket-orange-700":
                        props.call.status == "Em andamento",
                    "text-rocket-green-300": props.call.status == "Finalizado",
                })}
            >
                {props.call.status}
            </span>
        </div>
    );
}
