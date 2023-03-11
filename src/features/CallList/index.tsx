import moment from "moment";
import { CallCard } from "../../components/CallCard";
import { EmptyList } from "../../components/EmptyList";

interface iCall {
    id: string;
    patrimony: string;
    code: string;
    status: string;
    createdAt: string;
}

type CallListProps = {
    data: iCall[];
};

// moment.locale("pt-br");

export function CallList(props: CallListProps) {
    function formatDate(date: string) {
        return moment(date).format("DD/MM/YYYY - HH:mm");
    }

    if (!props.data.length) {
        return <EmptyList />;
    }

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {props.data.map((item) => (
                <CallCard
                    key={item.id}
                    code={item.code}
                    date={formatDate(item.createdAt)}
                    status={item.status}
                    link={`/chamado/${item.code}`}
                />
            ))}
        </div>
    );
}
