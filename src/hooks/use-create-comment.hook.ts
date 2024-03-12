import { store } from "@/stores";
import { ERequestMethod, TCreateCommentInput } from "@/types";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export const useCreateComment = (id: number) => {
  const auth = store.getState().auth;

  return useMutation(async (input: TCreateCommentInput) => {
    const result = await fetch(`/api/articles/${id}/comments`, {
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
  });
};
