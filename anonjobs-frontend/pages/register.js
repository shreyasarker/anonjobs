import Link from "next/link";
import * as routes from "../constants/routes";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <div className="content-section content-section-border pb-5">
          <div className="my-wrapper mx-auto">
            <header className="py-5 text-center">
              <h1 className="fw-bold fs-2 ft-5 text-grey">
                Registration for Employers only
              </h1>
            </header>
            <div className="text-dark-grey p-2 p-md-0 ">
              <RegisterForm />
              <div className="text-center mt-3">
                <label>Already a member? </label>
                <b>
                  <Link href={routes.LOGIN}>
                    <a data-turbo="false">&nbsp;Login</a>
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
};

export default Register;
