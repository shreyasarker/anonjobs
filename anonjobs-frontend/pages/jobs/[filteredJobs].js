import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/home/Header";
import Jobs from "../../components/home/Jobs";
import Subscription from "../../components/home/Subscription";
import { wrapper } from "../../store";
import { fetchJobTags, fetchJobs } from "../../store/jobs/job.action";
import { setFilters } from "../../store/filters/filters.slice";
import { getToken } from "../../store/auth/auth.actions";

const FilteredJobs = () => {
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <Header source="filtered"/>
        <Jobs source="filtered"/>
        {/* <Subscription /> */}
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

      const jobFilters = store.getState().filter.jobFilters; 
      const page = query ? query.page : 1;
      const searchFilter = query.search || jobFilters.search || null;
      const tagFilter = query.tag || jobFilters.tag || null;
      const isAnonFilter = query.isAnon || jobFilters.isAnon || null;
      const isRemoteFilter = query.isRemote || jobFilters.isRemote || null;

      store.dispatch(setFilters({ search: searchFilter, tag: tagFilter, isAnon: isAnonFilter, isRemote: isRemoteFilter }));
      query = {
        page: page,
        search: searchFilter,
        tag: tagFilter,
        isAnon: isAnonFilter,
        isRemote: isRemoteFilter,
      };
     
      await store.dispatch(fetchJobTags({ ssr:true }));
      await store.dispatch(
        fetchJobs({
          ssr: true,
          reqHeaders,
          page,
          filters: { search: searchFilter, tag: tagFilter, isAnon: isAnonFilter, isRemote: isRemoteFilter }
        })
      );

      return {};
    }
);

export default FilteredJobs;
