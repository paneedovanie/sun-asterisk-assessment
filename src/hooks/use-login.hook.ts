import { setAuth, store } from "@/stores";
import { ERequestMethod, TLoginInput } from "@/types";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export const useLogin = () => {
  const dispatch = store.dispatch;
  const router = useRouter();

  return useMutation(
    async (input: TLoginInput) => {
      const result = await fetch(`/api/auth/login`, {
        method: ERequestMethod.Post,
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        return result.json();
      } else {
        throw await result.json();
      }
    },
    {
      onSuccess: (v: { user: User; accessToken: string }) => {
        dispatch(setAuth(v));
        localStorage.setItem("ACCESS_TOKEN", v.accessToken);
        router.push("/u");
      },
    }
  );
};
