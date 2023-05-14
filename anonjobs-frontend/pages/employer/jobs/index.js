import EmployerJobList from "../../../components/employer/jobs/List";
import Footer from "../../../components/layouts/Footer";
import Navbar from "../../../components/layouts/Navbar";
import { wrapper } from "../../../store";
import { getToken } from "../../../store/auth/auth.actions";
import { fetchEmployerJobs } from "../../../store/employers/employer.action";

const EmployerJobs = () => {
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <EmployerJobList />
        <Footer />
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      const page = query.page || 1;

      const existingToken = req.cookies[process.env.NEXT_PUBLIC_TOKEN_KEY];
      const encryptedCookie = req.cookies[process.env.NEXT_PUBLIC_ENCRYPTED_COOKIE_NAME];
      const token = getToken(existingToken, encryptedCookie);

      const reqHeaders = {
        headers: {
          origin: process.env.NEXT_PUBLIC_ORIGIN,
          Authorization: token? `Bearer ${token.token}`: ''
        },
      };
      await store.dispatch(fetchEmployerJobs({ ssr: true, page: page, reqHeaders: reqHeaders }));

      return {};
    }
);

export default EmployerJobs;
