import React from "react";
import JobDetails from "../../../../components/jobs/Details";
import Footer from "../../../../components/layouts/Footer";
import Navbar from "../../../../components/layouts/Navbar";
import { wrapper } from "../../../../store";
import { fetchJob } from "../../../../store/jobs/job.action";
import { getToken } from "../../../../store/auth/auth.actions";

const JobShow = () => {
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <JobDetails />
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

      await store.dispatch(fetchJob({ssr: true, id: params.jobId, reqHeaders: reqHeaders}));
      
      return {};
    }
);

export default JobShow;
