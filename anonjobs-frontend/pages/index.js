import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Header from "../components/home/Header";
import Jobs from "../components/home/Jobs";
import Subscription from "../components/home/Subscription";
import { wrapper } from "../store";
import { fetchJobTags, fetchJobs } from "../store/jobs/job.action";
import { clearFilters } from "../store/filters/filters.slice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearFilters());
  }, [dispatch]);
  return (
    <main className="anonjobs flex-shrink-0">
      <div className="mx-auto px-md-3 mt-4 mx-auto main-container">
        <Navbar />
        <Header/>
        <Jobs/>
        {/* <Subscription /> */}
        <Footer />
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {

      const page = query ? query.page : 1;
      
      await store.dispatch(fetchJobTags());
      await store.dispatch(fetchJobs({page: page}));

      return {};
    }
);

export default (Home);
