import { useEffect } from "react";
import { useRouter } from "next/router";
import * as routes from "../constants/routes";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedRoute = ({ protectedRoutes, children }) => {
  const router = useRouter();
  const { status, isAuthenticated } = useSelector((state) => state.auth);

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    // if (isAuthenticated && (router.pathname === "/login" || router.pathname === "/register")) {
    //   router.back();
    // }
    if (status ==='resolved' && !isAuthenticated && pathIsProtected) {
      router.push(routes.LOGIN);
    }
  }, [router, status, isAuthenticated, pathIsProtected]);

  if (status ==='resolved' || (!isAuthenticated && pathIsProtected)) {
    <Loading />
  }

  return children;
};

export default ProtectedRoute;
