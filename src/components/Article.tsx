import { useGetArticle } from "@/hooks";
import { Card } from "./Card";
import Link from "next/link";
import { DeleteArticleButton } from "./DeleteArticleButton";
import { format } from "date-fns";
import { UpvoteArticleButton } from "./UpvoteArticleButton";
import { CreateCommentForm } from "./CreateCommentForm";
import { store } from "@/stores";

export function Article(props: { id: number }) {
  const auth = store.getState().auth;
  const { data, isFetching, refetch } = useGetArticle(props.id, {
    enabled: !!props.id,
    retry: 0,
  });

  return (
    <>
      {isFetching && <div>Fetching article...</div>}
      {data && !isFetching && (
        <Card>
          <div className="flex gap-3">
            <h1 className="text-2xl text-cyan-700 font-bold mb-3 flex-1">
              {data?.title}
            </h1>
            {auth.user?.id === data.authorId && (
              <div className="flex gap-3">
                <Link
                  href={`/u/articles/${props.id}/update`}
                  className="text-yellow-700"
                >
                  Update
                </Link>
                <DeleteArticleButton articleId={props.id} />
              </div>
            )}
          </div>
          <p>{data?.content}</p>
          <div className="flex justify-between gap-1 md:flex-row flex-col">
            <small className="text-gray-600">
              {format(data?.createdAt, "MMM dd, y hh:mm a")}
            </small>
            <UpvoteArticleButton article={data} />
          </div>
          <hr className="my-3" />
          <div className="mb-3">
            <CreateCommentForm
              articleId={props.id}
              onSuccess={() => refetch()}
            />
          </div>
          {!data.comments.length && <div>No comment</div>}
          {data.comments.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="flex gap-3 items-end">
                <h5 className="font-bold">{item.user.name}</h5>
                <small className="text-gray-600">
                  {format(item?.createdAt, "MMM dd, y hh:mm a")}
                </small>
              </div>
              <p>{item.content}</p>
            </div>
          ))}
        </Card>
      )}
      {!data && !isFetching && <div>Article not found</div>}
    </>
  );
}
