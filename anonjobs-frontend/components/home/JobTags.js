import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/filters/filters.slice";
import { getFilters } from "../../utils";

const JobTags = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobTags } = useSelector((state) => state.job);
  const { jobFilters } = useSelector((state) => state.filter);
  const tagFilter = jobFilters.tag;

  const handleTagFilter = (e, tagName) => {
    e.preventDefault();
    const filters = getFilters(router, {
      key: "tag",
      value: tagName,
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
    <div className="mb-1 mb-md-3 text-center pt-2 px-3 px-md-0">
      <div className="tags">
        {jobTags &&
          jobTags.map((tag, index) => (
            <span
              className="my-badge px-2 my-badge-primary badge-tag"
              key={index}
              onClick={(e) => handleTagFilter(e, tag.name)}
              style={{
                backgroundColor: tagFilter === tag.name ? "#d5d3d3" :  " "
              }}
            >
              <a
                href="tag"
                style={{
                  color: tagFilter === tag.name ? "#000000" : "inherit",
                }}
              >
                {tag.name}
              </a>
            </span>
          ))}
      </div>
    </div>
  );
};

export default JobTags;
