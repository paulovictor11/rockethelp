import * as RadixLabel from "@radix-ui/react-label";
import cx from "classnames";
import { InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

type RootProps = {
    children: ReactNode;
};

function Root(props: RootProps) {
    return <div className="flex flex-col gap-1 w-full">{props.children}</div>;
}

Root.displayName = "FormField.Root";

type LabelProps = {
    text: string;
    htmlForm: string;
};

function Label({ text, htmlForm }: LabelProps) {
    return (
        <RadixLabel.Root
            htmlFor={htmlForm}
            className="font-semibold text-xl text-rocket-gray-100"
        >
            {text}
        </RadixLabel.Root>
    );
}

Label.displayName = "FormField.Label";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    register: UseFormRegister<any>;
    required?: boolean;
    hasError?: boolean;
    icon?: ReactNode;
};

function Input({
    label,
    register,
    required = false,
    hasError = false,
    icon = null,
    ...rest
}: InputProps) {
    return (
        <div
            className={cx(
                "flex items-center gap-3 w-full h-12 py-3 px-4 rounded-lg bg-rocket-gray-700 focus-within:ring-2 focus-within:ring-rocket-green-500",
                {
                    "focus-within:ring-rocket-red-700": hasError,
                }
            )}
        >
            {icon}
            <input
                {...register(label, { required })}
                {...rest}
                id={label}
                name={label}
                className="bg-transparent appearance-none flex-1 text-gray-100 outline-none text-base placeholder:text-base placeholder:text-rocket-gray-300"
            />
        </div>
    );
}

Input.displayName = "FormField.Input";

type MessageProps = {
    content: string;
};

function Message(props: MessageProps) {
    return (
        <span className="font-semibold text-sm text-rocket-red-700">
            {props.content}
        </span>
    );
}

Message.displayName = "FormField.Message";

export const FormField = {
    Root: Root,
    Label: Label,
    Input: Input,
    Message: Message,
};
