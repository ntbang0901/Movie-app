import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";

import { RecoilRoot } from "recoil";
import { auth, db } from "../configs/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Login from "./login";
import Modal from "../components/Modal";

export default function App({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, _error] = useAuthState(auth);

  const router = useRouter();

  // const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const getUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInUser?.uid as string),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser?.photoURL,
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.log("error::", error);
      }
    };

    if (loggedInUser) {
      getUserInDb();
    }
  }, [loggedInUser]);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setHasMounted(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setHasMounted(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  if (loading || hasMounted) return <Loading />;

  if (!loggedInUser) return <Login />;

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <Modal />
    </RecoilRoot>
  );
}
