import { store } from "@/stores";
import { ERequestMethod, TCreateArticleInput } from "@/types";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export const useCreateArticle = () => {
  const auth = store.getState().auth;
  const router = useRouter();

  return useMutation(
    async (input: TCreateArticleInput) => {
      const result = await fetch(`/api/articles`, {
        method: ERequestMethod.Post,
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      if (result.ok) {
        return result.json();
      } else {
        throw await result.json();
      }
    },
    {
      onSuccess: () => {
        router.push("/u");
      },
    }
  );
};
