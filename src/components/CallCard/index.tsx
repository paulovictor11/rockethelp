import cx from "classnames";
import Link from "next/link";
import { CircleWavyCheck, ClockAfternoon, Hourglass } from "phosphor-react";

type CallCardProps = {
    code: string;
    date: string;
    link: string;
    status: string;
};

export function CallCard(props: CallCardProps) {
    return (
        <Link
            href={props.link}
            className={cx(
                "bg-rocket-gray-600 rounded-md p-5 border-l-8 flex items-center justify-between",
                {
                    "border-l-rocket-orange-700":
                        props.status == "Em andamento",
                    "border-l-rocket-green-300": props.status == "Finalizado",
                }
            )}
        >
            <div>
                <span className="font-bold text-lg text-rocket-gray-100 mb-[2px]">
                    Chamado #{props.code}
                </span>
                <span className="text-xs text-rocket-gray-200 flex items-center gap-1">
                    <ClockAfternoon
                        size={18}
                        className="text-rocket-gray-300"
                    />
                    {props.date}
                </span>
            </div>

            <div className="bg-rocket-gray-500 rounded-full h-12 w-12 flex items-center justify-center">
                {props.status == "Em andamento" ? (
                    <Hourglass size={24} className="text-rocket-orange-700" />
                ) : (
                    <CircleWavyCheck
                        size={24}
                        className="text-rocket-green-300"
                    />
                )}
            </div>
        </Link>
    );
}
