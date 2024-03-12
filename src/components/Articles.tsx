import { useListArticles } from "@/hooks";
import { Card } from "./Card";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export const Articles = () => {
  const { data } = useListArticles();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      {!data?.length && <div className="text-center">No article</div>}
      {data?.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer"
          onClick={() => router.push(`/u/articles/${item.id}`)}
        >
          <h5 className="text-xl font-bold">{item.title}</h5>
          <p className="line-clamp-1">{item.content}</p>
          <small className="text-gray-600">
            {format(item.createdAt, "MMM dd, y hh:mm a")}
          </small>
        </Card>
      ))}
    </div>
  );
};
