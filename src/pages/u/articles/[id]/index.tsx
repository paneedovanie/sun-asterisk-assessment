import { Article, Auth, TopBar } from "@/components";
import { useParams } from "next/navigation";

export default function ViewArticle() {
  const params = useParams();
  const id = parseInt(params?.id as string);

  return (
    <Auth isAuthorized={true}>
      <div className="px-3 mx-auto max-w-screen-lg w-full">
        <TopBar />
        <main className="py-3">
          <Article id={id} />
        </main>
      </div>
    </Auth>
  );
}
