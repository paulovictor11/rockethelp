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
        <div className="grid grid-cols-3 gap-3">
            {props.data.map((item) => (
                <CallCard
                    key={item.id}
                    patrimony={item.patrimony}
                    date={formatDate(item.createdAt)}
                    status={item.status}
                    link={`/chamado/${item.code}`}
                />
            ))}
        </div>
    );
}
