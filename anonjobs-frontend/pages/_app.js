import { useDispatch, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { wrapper } from "../store";
import "../styles/Index.css";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { useEffect, useState, useCallback } from "react";
import { fetchAuthUser } from "../store/auth/auth.actions";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  // const store = useStore();
  const dispatch = useDispatch();
  const store = useStore((state) => state);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const protectedRoutes = ["/jobs/create", "/employer/jobs", "/jobs/edit/[jobId]"];

  const storePathValues = useCallback(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    const currentPath = globalThis.location.pathname;
    storage.setItem("currentPath", currentPath);
  }, []);

  useEffect(() => {
    storePathValues();
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
      dispatch(fetchAuthUser());
  }, [router, dispatch, storePathValues]);

  return (
    // <Provider store={store}>
    <PersistGate persistor={store.__persistor} loading={null}>
      {() => (
        <>
          <Head>
            <title>
              AnonJobs: Web3, Blockchain, Smart Contract, Crypto and Jobs
            </title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="AnonJobs" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {process.env.NEXT_PUBLIC_APP_ENV === "production" && (
            <Script
              id="hs-script-loader"
              async
              defer
              src="//js-na1.hs-scripts.com/22180226.js"
            ></Script>
          )}

          <ProtectedRoute protectedRoutes={protectedRoutes}>
            {isLoading && <Loading />}
            {!isLoading && <Component {...pageProps} />}
          </ProtectedRoute>
        </>
      )}
    </PersistGate>
    // </Provider>
  );
}

export default wrapper.withRedux(MyApp);
