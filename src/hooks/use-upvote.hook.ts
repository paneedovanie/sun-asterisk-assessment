import { store } from "@/stores";
import { ERequestMethod } from "@/types";
import { useMutation } from "react-query";

export const useUpvote = () => {
  const auth = store.getState().auth;

  return useMutation(async (id: number) => {
    const result = await fetch(`/api/articles/${id}/upvotes`, {
      method: ERequestMethod.Patch,
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
  });
};
