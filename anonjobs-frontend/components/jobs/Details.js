import { useDispatch, useSelector } from "react-redux";
import DOMPurify from 'isomorphic-dompurify';
import { useRouter } from "next/router";
import { getFilters } from "../../utils";
import Link from "next/link";
import { setFilters } from "../../store/filters/filters.slice";

const JobDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { job } = useSelector((state) => state.job);

  const handleTagFilter = (e, tagName) => {
    e.preventDefault();
    const filters = getFilters(router, {
      key: "tag",
      value: tagName,
    });
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
    <div className="content-section content-section-border pb-5 job-details">
      <div className="my-wrapper mx-auto">
        <header className="py-1 py-md-5 text-center">
          <div>
            <h1 className="fw-bold ft-5 text-grey job-details-heading">
              <div>{job.company} is looking for a </div>
              <strong>{job.position}</strong>
              {job.is_editable && <Link href={`/jobs/edit/${job.id}`}><a>&nbsp;&nbsp;<i className="fa fa-edit"></i></a></Link>}
            </h1>
          </div>
          <div className="mt-3">
            <p>{job.location}</p>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h5>
                <span className="p-2">Job Type: {job.type}</span>
              </h5>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h5>
                <span className="p-2">Remote: {job.is_remote}</span>
              </h5>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h5>
                <span className="p-2">Anon: {job.is_anon}</span>
              </h5>
            </div>
          </div>
          {!job.company_logo && (
            <div className="text-center mt-5 d-md-block">
              <a
                target="_blank"
                className="my-btn my-btn-primary-maximum border-radius-all-sides"
                {...(job.apply_email
                  ? { href: `mailto:${job.apply_url_or_email}` }
                  : { href: job.apply_url_or_email })}
              >
                Apply Now
              </a>
            </div>
          )}
        </header>
        <div className="p-2 p-md-0">
          {job.company_logo && (
            <div className="border p-2 col-md-3 col-lg-3 col-sm-12 company-profile float-md-end me-md-0 text-center">
              <img
                className="company-logo"
                alt="company-logo"
                src={job.company_logo}
              />
              
              <Link href={`/jobs/company/${job.company_slug}`}>
                <a className="text-center">
                  <h4 className="fw-bold ft-5 text-grey">{job.company}</h4>
                </a>
              </Link>
              <a
                target="_blank"
                className="my-btn my-btn-primary-maximum border-radius-all-sides apply-button"
                {...(job.apply_email
                  ? { href: `mailto:${job.apply_url_or_email}` }
                  : { href: job.apply_url_or_email })}
              >
                Apply Now
              </a>
            </div>
          )}
          <div className="job-details-description">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(job.description),
              }}
            />
          </div>
          <div className="row text-center job-details-salary my-5">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h5>
                <span className="p-2">Salary: {job.salary}</span>
              </h5>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h5>
                <span className="p-2">
                  Crypto Salary Type: {job.display_crypto_salary}
                </span>
              </h5>
            </div>
          </div>
          <div className="border p-4 border-radius-all-sides mt-4 text-center">
            <h3 className="ft-5 text-grey mt-2">How to apply?</h3>
            <div className="p-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.how_to_apply),
                }}
              />
            </div>
            <a
              target="_blank"
              className="my-btn my-btn-primary-maximum border-radius-all-sides apply-button"
              {...(job.apply_email
                ? { href: `mailto:${job.apply_url_or_email}` }
                : { href: job.apply_url_or_email })}
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
      <div className="d-block d-md-flex justify-content-between pt-4">
        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
          <p className="text-dark-grey">Added on {job.created_at}</p>
        </div>
        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
          <div className="d-flex justify-content-center">
            <div className="text-dark-grey">See more jobs at</div>
            <div>
              <Link href={`/jobs/company/${job.company_slug}`}>
                <a className="ms-2">
                  {job.company}
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
          <div className="tags">
            {job.tag_names &&
              job.tag_names.map((tag, index) => (
                <span
                  className="my-badge px-2 my-badge-primary badge-tag"
                  key={index}
                  onClick={(e) => handleTagFilter(e, tag)}
                >
                  <a href="../">{tag}</a>
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
