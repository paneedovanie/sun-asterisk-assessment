import { ERequestMethod, TRegisterInput } from "@/types";
import { useMutation } from "react-query";

export const useRegister = () =>
  useMutation(async (input: TRegisterInput) => {
    const result = await fetch(`/api/auth/register`, {
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
  });
