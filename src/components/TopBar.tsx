import { APP_NAME } from "@/core/constants";
import { clearAuth, store } from "@/stores";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export const TopBar = () => {
  const auth = store.getState().auth;
  const user = auth.user;
  const router = useRouter();
  const dispatch = store.dispatch;

  const logout = () => {
    dispatch(clearAuth());
  };

  return (
    <header className="bg-cyan-700 text-white p-3 flex justify-between items-center md:flex-row flex-col">
      <h1 className="cursor-pointer" onClick={() => router.push("/")}>
        {APP_NAME}
      </h1>
      {user && (
        <div className="flex gap-3 items-center">
          {user?.name}
          <Button className="bg-red-700" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};
