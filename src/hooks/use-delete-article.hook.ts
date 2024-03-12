import { store } from "@/stores";
import { ERequestMethod } from "@/types";
import { UseMutationOptions, useMutation } from "react-query";

export const useDeleteArticle = (
  options: UseMutationOptions<unknown, unknown, number>
) => {
  const auth = store.getState().auth;

  return useMutation<unknown, unknown, number>(async (id: number) => {
    const result = await fetch(`/api/articles/${id}`, {
      method: ERequestMethod.Delete,
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
  }, options);
};
