import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type TooltipProps = {
    text: string;
    children: ReactNode;
};

export function Tooltip(props: TooltipProps) {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                    {props.children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className="bg-rocket-gray-500 px-4 py-2 text-white rounded-md cursor-default"
                        sideOffset={5}
                    >
                        {props.text}
                        <RadixTooltip.Arrow className="fill-[#29292E]" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
}
