import { store } from "@/stores";
import { ERequestMethod } from "@/types";
import { Article } from "@prisma/client";
import { UseQueryOptions, useQuery } from "react-query";

export const useListArticles = (options?: UseQueryOptions<Article[]>) => {
  const auth = store.getState().auth;

  return useQuery<Article[]>(
    ["listArticles"],
    async () => {
      const result = await fetch(`/api/articles`, {
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
