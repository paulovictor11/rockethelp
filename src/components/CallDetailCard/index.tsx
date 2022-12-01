import moment from "moment";
import { ReactNode } from "react";

type RootProps = {
    children: ReactNode;
};

function Root(props: RootProps) {
    return (
        <div className="bg-rocket-gray-600 p-6 rounded-md flex flex-col gap-3">
            {props.children}
        </div>
    );
}

Root.displayName = "CallDetailCard.Root";

type TitleProps = {
    icon: ReactNode;
    text: string;
};

function Title(props: TitleProps) {
    return (
        <div className="flex items-center gap-2">
            {props.icon}
            <span className="text-sm text-rocket-gray-300 uppercase">
                {props.text}
            </span>
        </div>
    );
}

Title.displayName = "CallDetailCard.Title";

type ContentProps = {
    children: ReactNode;
};

function Content(props: ContentProps) {
    return (
        <span className="text-base text-rocket-gray-100">{props.children}</span>
    );
}

Content.displayName = "CallDetailCard.Content";

type DateProps = {
    dateTime: string;
};

function Date(props: DateProps) {
    return (
        <div className="border-t border-rocket-gray-400 pt-3">
            <span className="text-sm text-rocket-gray-300">
                Registrado em{" "}
                {moment(props.dateTime).format("DD/MM/YYYY - HH:mm")}
            </span>
        </div>
    );
}

Date.displayName = "CallDetailCard.Date";

export const CallDetailCard = {
    Root: Root,
    Title: Title,
    Content: Content,
    Date: Date,
};
