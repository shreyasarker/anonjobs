import CompanyJobList from "../../../components/jobs/CompanyJobList";
import Footer from "../../../components/layouts/Footer";
import Navbar from "../../../components/layouts/Navbar";
import { wrapper } from "../../../store";
import { getToken } from "../../../store/auth/auth.actions";
import { fetchCompanyJobs } from "../../../store/jobs/job.action";

const CompanyJobs = () => {
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <CompanyJobList />
        <Footer />
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, res, query }) => {

      const existingToken = req.cookies[process.env.NEXT_PUBLIC_TOKEN_KEY];
      const encryptedCookie = req.cookies[process.env.NEXT_PUBLIC_ENCRYPTED_COOKIE_NAME];
      const token = getToken(existingToken, encryptedCookie);
      
      const reqHeaders = {
        headers: {
          origin: process.env.NEXT_PUBLIC_ORIGIN,
          Authorization: token? `Bearer ${token.token}`: '',
        },
      };

      const page = query.page || 1;

      await store.dispatch(fetchCompanyJobs({ ssr: true, reqHeaders: reqHeaders, page: page, slug: params.companySlug }));

      return {};
    }
);

export default CompanyJobs;
