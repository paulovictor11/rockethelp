import * as RadixTabs from "@radix-ui/react-tabs";
import cx from "classnames";
import { ReactNode } from "react";

type TabRootProps = {
    defaultValue: string;
    children: ReactNode;
};

function TabRoot(props: TabRootProps) {
    return (
        <RadixTabs.Root defaultValue={props.defaultValue}>
            {props.children}
        </RadixTabs.Root>
    );
}

TabRoot.displayName = "Tabs.Root";

type TabListProps = {
    children: ReactNode;
};

function TabList(props: TabListProps) {
    return (
        <RadixTabs.List className="bg-transparent mb-4 flex gap-3">
            {props.children}
        </RadixTabs.List>
    );
}

TabList.displayName = "Tabs.List";

type TabTriggerProps = {
    value: string;
    label: string;
    color: "orange" | "green" | "purple";
};

function TabTrigger(props: TabTriggerProps) {
    return (
        <RadixTabs.Trigger
            value={props.value}
            className={cx(
                "flex-1 rounded py-2 px-11 font-normal text-rocket-gray-300 text-xs bg-rocket-gray-600 uppercase",
                {
                    "state-active:border state-active:border-rocket-orange-700 state-active:text-rocket-orange-700":
                        props.color == "orange",
                    "state-active:border state-active:border-rocket-green-700 state-active:text-rocket-green-700":
                        props.color == "green",
                    "state-active:border state-active:border-rocket-purple-700 state-active:text-rocket-purple-700":
                        props.color == "purple",
                }
            )}
        >
            {props.label}
        </RadixTabs.Trigger>
    );
}

TabTrigger.displayName = "Tabs.Trigger";

type TabContentProps = {
    value: string;
    children: ReactNode;
};

function TabContent(props: TabContentProps) {
    return (
        <RadixTabs.Content value={props.value}>
            {props.children}
        </RadixTabs.Content>
    );
}

TabContent.displayName = "Tabs.Content";

export const Tabs = {
    Root: TabRoot,
    List: TabList,
    Trigger: TabTrigger,
    Content: TabContent,
};
