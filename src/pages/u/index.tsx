import { Articles, Auth, Button, TopBar } from "@/components";
import { useRouter } from "next/router";

export default function NewsFeed() {
  const router = useRouter();
  return (
    <Auth isAuthorized={true}>
      <div className="px-3 mx-auto max-w-screen-lg w-full">
        <TopBar />
        <main className="py-3">
          <div className="flex justify-end mb-3">
            <Button onClick={() => router.push("/u/create-article")}>
              Create New Article
            </Button>
          </div>
          <Articles />
        </main>
      </div>
    </Auth>
  );
}
