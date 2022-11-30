import * as Separator from "@radix-ui/react-separator";

type DividerProps = {
    orientation?: "vertical" | "horizontal";
};

export function Divider({ orientation = "horizontal" }: DividerProps) {
    return (
        <Separator.Root
            orientation={orientation}
            className="h-px my-5 bg-white/30 rounded-full"
        />
    );
}
