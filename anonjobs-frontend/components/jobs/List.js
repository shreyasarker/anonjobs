import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Paginate from "../../libs/paginate/Index";
import Image from "next/image";

const style = {
  link: { textDecoration: "none" },
  paidLogoEmpty: { color: "#ffffff" },
  jobTitle: { color: "#ffffff" },
  jobCompany: { color: "#ffffff", fontSize: "12px" },
  jobSalary: { fontSize: "12px" },
  jobType: { color: "#d5d3d3", fontSize: "12px" },
  jobPulishedTime: { color: "#ffffff" },
  jobApplyLink: { textDecoration: "none", whiteSpace: "nowrap" },
};

const JobList = () => {
  const router = useRouter();
  const { jobs } = useSelector((state) => state.job);
  return (
    <>
    <div className="job-list mt-4">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>Job Position and Company</th>
            <th>Location</th>
            <th>Tags</th>
            <th>Posted</th>
            <th>Apply</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {jobs && jobs.data && jobs.data.length <= 0 && (
            <tr className="text-center">
              <td colSpan={5}>No job found.</td>
            </tr>
          )}

          {jobs &&
            jobs.data &&
            jobs.data.map((job, index) => (
              <tr
                className="job-list-item"
                key={index}
                style={{ backgroundColor: job.job_higlight_color }}
                onClick={(event) => {
                  router.push(`/jobs/show/${job.position_slug}/${job.id}`);
                }}
              >
                <td>
                  <div className="d-flex non-custom-job-item">
                    {!job.company_logo && (
                      <div
                        className="rounded paid_logo_empty"
                        style={style.paidLogoEmpty}
                      >
                        {job.company_initial}
                      </div>
                    )}
                    {job.company_logo && (
                      <Image src={job.company_logo} alt="company-logo" className="rounded paid_logo lazy" width={50} height={50} />
                    )}
                    <div className="d-flex flex-column ps-2 align-middle">
                      <div className="job-title-mobile mb-auto">
                        <Link href={`/jobs/show/${job.position_slug}/${job.id}`}>
                          <a style={style.link}>
                          <h2
                            className="fs-6 fs-md-5 fw-bold my-primary"
                            style={style.jobTitle}
                          >
                            {job.position}
                          </h2>
                          </a>
                        </Link>
                      </div>
                      <div className="mt-auto d-block d-md-flex">
                        <Link href={`/jobs/show/${job.position_slug}/${job.id}`}>
                          <a style={style.link}>
                          <h3 style={style.jobCompany}>{job.company}</h3>
                          </a>
                        </Link>
                      </div>
                      <p className="ps-0 mb-0" style={style.jobSalary}>
                        {job.salary}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="job-location-mobile">
                  <p style={style.jobType}>{job.type}</p>
                </td>
                <td className="align-middle d-none d-md-table-cell">
                  <div className="tags">
                    {job.tag_names &&
                      job.tag_names.map((tag, index) => (
                        <span
                          className="my-badge my-badge-secondary-no-hover badge-tag"
                          key={index}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="align-middle job-time-ago-mobile">
                  <p className="text-dark-grey" style={style.jobPulishedTime}>
                    {job.is_pinned === 1 && (
                      <span className="text-danger">
                        <i className="fa fa-thumbtack"></i>&nbsp;&nbsp;
                      </span>
                    )}
                    {job.created_at}
                  </p>
                </td>
                <td className="align-middle d-none d-md-table-cell" onClick={(e)=>e.stopPropagation()}>
                  <a
                    target="_blank"
                    data-turbo="false"
                    className="my-btn my-btn-primary-custom border-radius-all-sides"
                    style={style.jobApplyLink}
                    {...(job.apply_email
                      ? { href: `mailto:${job.apply_url_or_email}` }
                      : { href: job.apply_url_or_email })}
                  >
                    Apply
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    <div className="px-3">
      <div className="d-flex justify-content-center mt-3 mb-3">
        {jobs && jobs.data && jobs.data.length > 0 && jobs.links && jobs.meta && (
          <Paginate
            data={{ links: jobs.links, meta: jobs.meta }}
          />
        )}
      </div>
    </div>
  </>
  );
};

export default JobList;
