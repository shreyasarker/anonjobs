import Link from "next/link";
import * as routes from "../../constants/routes";
import * as roles from "../../constants/roles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/auth.actions";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    router.push("/");
  };
  return (
    <nav className="navbar navbar-expand-md mb-4">
      <div className="container-fluid navbar-brand m-0">
        <Link href={routes.HOME}>
          <a className="navbar-brand fw-bold ft-5 align-middle">AnonJobs</a>
        </Link>
        {isAuthenticated && user.role === roles.EMPLOYER && (
          <Link href={routes.EMPLOYER_JOB_LIST}>
            <a
              className="my-btn my-btn-primary-maximum ms-auto d-inline-block d-md-none post-job-menu border-radius-all-sides"
              data-turbo="false"
            >
              Jobs
            </a>
          </Link>
        )}
        <Link href={routes.JOB_CREATE}>
          <a
            className="my-btn my-btn-primary-maximum ms-3 d-inline-block d-md-none post-job-menu border-radius-all-sides"
            data-turbo="false"
          >
            Post Job
          </a>
        </Link>
        {!isAuthenticated ? (
          <Link href={routes.LOGIN}>
            <a
              className="my-btn my-btn-primary-maximum ms-3 d-inline-block d-md-none post-job-menu border-radius-all-sides"
              data-turbo="false"
            >
              Login
            </a>
          </Link>
        ) : (
          <a
            className="my-btn my-btn-primary-maximum ms-3 d-inline-block d-md-none post-job-menu border-radius-all-sides"
            data-turbo="false"
            href="{void(0)}"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </a>
        )}
      </div>
      <div className="container-fluid mt-3 mt-md-0 menus">
        <div
          className="collapse navbar-collapse me-md-5 me-3"
          id="navbarNavDarkDropdown"
        ></div>
        {isAuthenticated && user.role === roles.EMPLOYER && (
          <Link href={routes.EMPLOYER_JOB_LIST}>
            <a
              className="my-btn my-btn-primary-maximum d-none d-md-inline ms-0 ms-lg-2 post-job-menu border-radius-all-sides"
              data-turbo="false"
            >
              Jobs
            </a>
          </Link>
        )}
        <Link href={routes.JOB_CREATE}>
          <a
            className="my-btn my-btn-primary-maximum d-none d-md-inline ms-0 ms-lg-2 post-job-menu border-radius-all-sides"
            data-turbo="false"
          >
            Post a Job
          </a>
        </Link>
        {!isAuthenticated ? (
          <Link href={routes.LOGIN}>
            <a
              className="my-btn my-btn-primary-maximum d-none d-md-inline ms-0 ms-lg-2 post-job-menu border-radius-all-sides"
              data-turbo="false"
            >
              Login
            </a>
          </Link>
        ) : (
          <a
            className="my-btn my-btn-primary-maximum d-none d-md-inline ms-0 ms-lg-2 post-job-menu border-radius-all-sides"
            data-turbo="false"
            href="{void(0)}"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </a>
        )}
      </div>
      <div>
        <ul className="navbar-nav"></ul>
      </div>
    </nav>
  );
}

export default Navbar;
