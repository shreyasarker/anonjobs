import Link from "next/link";
import * as routes from "../constants/routes";
import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const Login = () => {

  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <div className="content-section content-section-border pb-5">
          <div className="my-wrapper mx-auto">
            <header className="py-5 text-center">
              <h1 className="fw-bold fs-2 ft-5 text-grey">
                Login for Employers only
              </h1>
            </header>
            <div className="p-2 p-md-0">
              <LoginForm/>

              <div className="text-center mt-3">
                <label>Not a member yet? </label>
                <b>
                  <Link href={routes.REGISTER}>
                    <a data-turbo="false">&nbsp;Register</a>
                  </Link>
                </b>
                <br />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default Login;