import { store } from "@/stores";
import { ERequestMethod, TUpdateArticleInput } from "@/types";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export const useUpdateArticle = (id: number) => {
  const auth = store.getState().auth;
  const router = useRouter();

  return useMutation(
    async (input: TUpdateArticleInput) => {
      const result = await fetch(`/api/articles/${id}`, {
        method: ERequestMethod.Put,
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
        router.push(`/u/articles/${id}`);
      },
    }
  );
};
