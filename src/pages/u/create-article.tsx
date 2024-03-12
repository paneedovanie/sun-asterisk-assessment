import { Auth, CreateArticleForm, TopBar } from "@/components";

export default function CreateArticle() {
  return (
    <Auth isAuthorized={true}>
      <div className="px-3 mx-auto max-w-screen-lg w-full">
        <TopBar />
        <main className="py-3">
          <CreateArticleForm />
        </main>
      </div>
    </Auth>
  );
}
