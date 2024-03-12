import { Auth, UpdateArticleForm, TopBar } from "@/components";
import { useGetArticle } from "@/hooks";
import { useParams } from "next/navigation";

export default function UpdateArticle() {
  const params = useParams();
  const id = parseInt(params?.id as string);
  const { data, isFetching, refetch } = useGetArticle(id, {
    enabled: !!id,
    retry: 0,
  });

  return (
    <Auth isAuthorized={true}>
      <div className="px-3 mx-auto max-w-screen-lg w-full">
        <TopBar />
        <main className="py-3">
          {isFetching && <div>Fetching article...</div>}
          {data && !isFetching && <UpdateArticleForm article={data} />}
          {!data && !isFetching && <div>Article not found</div>}
        </main>
      </div>
    </Auth>
  );
}
