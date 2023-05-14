import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/filters/filters.slice";
import { getFilters } from "../../utils";

const Header = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobFilters } = useSelector((state) => state.filter);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if(props.source ==="filtered" && jobFilters.search) {
      setSearchText(jobFilters.search);
    }
  }, [jobFilters, props.source]);

  const handleSearchFilter = (e) => {
    e.preventDefault();

    const filters = getFilters(router, {
      key: "search",
      value: searchText,
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
    <header className="p-0">
      <div className="banner text-center">
        <div className="mx-1">
          <h1 id="h" className="fw-bold display-4 text-uppercase">
            Want to work in Web3?
          </h1>
          <p id="hh" className="mt-4">
            Browse for remote jobs, anon friendly jobs from many projects
          </p>
        </div>
        <form method="post">
          <div className="d-flex justify-content-center align-items-end">
            <div className="mt-3">
              <input
                required="required"
                className="form-control border-primary search-form"
                placeholder="web3"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "web3")}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                name="search"
                id="search"
                value={searchText}
              />
            </div>
            <div>
              <input
                type="submit"
                name="commit"
                value="Search"
                className="my-btn my-btn-primary-maximum h40mob search-form-button"
                onClick={handleSearchFilter}
              />
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
