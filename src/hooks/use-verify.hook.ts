import { ERequestMethod } from "@/types";
import { User } from "@prisma/client";
import { UseQueryOptions, useQuery } from "react-query";

export const useVerify = (
  accessToken?: string,
  options?: UseQueryOptions<User>
) => {
  return useQuery<User>(
    ["verify"],
    async () => {
      const result = await fetch(`/api/auth/verify`, {
        method: ERequestMethod.Get,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : {}),
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
