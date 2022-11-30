import { ChatTeardropText } from "phosphor-react";

export function EmptyList() {
    return (
        <div className="flex flex-col items-center gap-3">
            <ChatTeardropText size={40} className="text-rocket-gray-400" />
            <span className="text-center text-xl text-rocket-gray-300">
                Você ainda não tem chamados criados.
            </span>
        </div>
    );
}
