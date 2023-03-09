import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";

export const useCheckAuth = () => {
  const router = useRouter();
  const [loggedInUser, loading, _error] = useAuthState(auth);

  const pathCheckLogin = useMemo(() => ["/login", "/register"], []);
  useEffect(() => {
    if (!loading) {
      if (loggedInUser && pathCheckLogin.includes(router.route)) {
        router.replace("/");
      } else if (!loggedInUser && !pathCheckLogin.includes(router.route)) {
        router.replace("/login");
      }
    }
  }, [loggedInUser, loading, pathCheckLogin, router]);

  return { loggedInUser, loading };
};
