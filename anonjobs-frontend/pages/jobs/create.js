import JobForm from "../../components/jobs/Form";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";
import { wrapper } from "../../store";
import { getToken } from "../../store/auth/auth.actions";
import { fetchTags } from "../../store/tags/tag.actions";
import { fetchYearlySalaries } from "../../store/yearlySalary/yearlySalary.action";

const Create = () => {
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <JobForm />
        <Footer />
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      
      const existingToken = req.cookies[process.env.NEXT_PUBLIC_TOKEN_KEY];
      const encryptedCookie = req.cookies[process.env.NEXT_PUBLIC_ENCRYPTED_COOKIE_NAME];
      const token = getToken(existingToken, encryptedCookie);

      const reqHeaders = {
        headers: {
          origin: process.env.NEXT_PUBLIC_ORIGIN,
          Authorization: token? `Bearer ${token.token}`: '',
        },
      };
      
      await store.dispatch(fetchTags({ ssr: true, reqHeaders: reqHeaders }));
      await store.dispatch(fetchYearlySalaries({ ssr: true, reqHeaders: reqHeaders }));
      
      return {};
    
    }
);

export default Create;
