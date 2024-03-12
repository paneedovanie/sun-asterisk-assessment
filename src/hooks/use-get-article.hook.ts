import { store } from "@/stores";
import { ERequestMethod } from "@/types";
import { TArticleExtended } from "@/types";
import { UseQueryOptions, useQuery } from "react-query";

export const useGetArticle = (
  id: number,
  options?: UseQueryOptions<TArticleExtended>
) => {
  const auth = store.getState().auth;

  return useQuery<TArticleExtended>(
    ["getArticle"],
    async () => {
      const result = await fetch(`/api/articles/${id}`, {
        method: ERequestMethod.Get,
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
    options
  );
};
