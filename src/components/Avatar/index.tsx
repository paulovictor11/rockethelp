import * as RadixAvatar from "@radix-ui/react-avatar";

export function Avatar() {
    return (
        <RadixAvatar.Root>
            <RadixAvatar.Image
                className="h-12 w-12 bg-rocket-gray-500 rounded-full hover:cursor-pointer"
                src="/avatar.jpg"
                alt="Foto do usuário logado"
            />
            <RadixAvatar.Fallback
                className="p-4 bg-rocket-gray-400 text-white rounded-full hover:cursor-pointer"
                delayMs={600}
            >
                PV
            </RadixAvatar.Fallback>
        </RadixAvatar.Root>
    );
}
