import { useState } from "react";
import { useUpvote } from "@/hooks";
import { TArticleExtended } from "@/types";

export function UpvoteArticleButton(props: { article: TArticleExtended }) {
  const [isUpvoted, setIsUpvoted] = useState(props.article.isUpvoted);
  const [count, setCount] = useState(props.article.upvotesCount);
  const { mutate } = useUpvote();

  return (
    <>
      <div
        className={`inline-block ${
          isUpvoted ? "text-green-700" : "text-gray-500"
        } cursor-pointer`}
        onClick={() =>
          mutate(props.article.id, {
            onSuccess: () => {
              setCount((v) => (isUpvoted ? v - 1 : v + 1));
              setIsUpvoted((v) => !v);
            },
          })
        }
      >
        Upvote {count}
      </div>
    </>
  );
}
