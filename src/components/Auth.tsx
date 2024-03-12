import { useVerify } from "@/hooks/use-verify.hook";
import { setAuth, store } from "@/stores";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const Auth = (props: { isAuthorized: boolean; children: ReactNode }) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);
  const [accessToken, setAccessToken] = useState<string>();
  const dispatch = store.dispatch;
  const pathname = usePathname();

  useVerify(accessToken, {
    onSuccess: (user) => {
      dispatch(setAuth({ user, accessToken }));
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("ACCESS_TOKEN") ?? undefined;

    if (
      (!props.isAuthorized && !storedAccessToken) ||
      (props.isAuthorized && store.getState().auth.user)
    ) {
      setIsFetching(false);
      return;
    } else if (!storedAccessToken && props.isAuthorized) {
      router.push("/");
    }

    setAccessToken(storedAccessToken);
    store.subscribe(() => {
      if (store.getState().auth.user) {
        if (!props.isAuthorized) {
          router.push("/u");
          return;
        } else {
          setIsFetching(false);
          return;
        }
      }
      localStorage.clear();
      router.push("/");
      setIsFetching(false);
    });
  }, [props.isAuthorized, router, pathname]);

  if (isFetching) {
    return <>Loading...</>;
  }

  return <>{props.children}</>;
};
