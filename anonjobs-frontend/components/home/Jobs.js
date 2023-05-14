import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/filters/filters.slice";
import { getFilters } from "../../utils";
import JobList from "../jobs/List";
import JobTags from "./JobTags";

const Jobs = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobFilters } = useSelector((state) => state.filter);
  const isAnonFilter = (props.source !=="filtered") ? false : jobFilters.isAnon === "Yes" ? true : false;
  const isRemoteFilter = (props.source !=="filtered") ? false : jobFilters.isRemote === "Yes" ? true : false;

  const handleCheckboxFilter = (e) => {
    const filters = getFilters(router, {
      key: e.target.name,
      value: e.target.checked ? "Yes" : null,
    }, jobFilters);
    dispatch(setFilters(filters.query));
    router.push(
      {
        pathname: filters.url,
        query: filters.query,
      },
      filters.url,
      { shallow: false }
    );
  };

  return (
    <div>
      <div className="content-section">
        <div className="my-wrapper px-0 p-md-2 pt-2 pt-md-4 main-border-sides main-border-top">
          <form className="form-check form-switch d-flex justify-content-center justify-content-md-end mb-2">
            <div className="me-5">
              <input
                className="form-check-input me-1"
                type="checkbox"
                name="is_anon"
                id="is_anon"
                onChange={(e) => handleCheckboxFilter(e)}
                // value={isAnon}
                defaultChecked={isAnonFilter}
              />
              <label className="form-check-label" htmlFor="is_anon">
                Anon
              </label>
            </div>
            <div className="me-2">
              <input
                className="form-check-input me-1"
                type="checkbox"
                name="is_remote"
                id="is_remote"
                onChange={(e) => handleCheckboxFilter(e)}
                // value={isRemote}
                defaultChecked={isRemoteFilter}
              />
              <label className="form-check-label" htmlFor="is_remote">
                Remote
              </label>
            </div>
          </form>
          <JobTags />
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
