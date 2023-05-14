import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Paginate from "../../libs/paginate/Index";

const style = {
  sectionHeight: { minHeight: "50vh" },
  link: { textDecoration: "none" },
  paidLogoEmpty: { color: "#ffffff" },
  jobTitle: { color: "#ffffff" },
  jobCompany: { color: "#ffffff", fontSize: "12px" },
  jobSalary: { fontSize: "12px" },
  jobType: { color: "#d5d3d3", fontSize: "12px" },
  jobPulishedTime: { color: "#ffffff" },
  jobApplyLink: { textDecoration: "none", whiteSpace: "nowrap" },
};

const CompanyJobList = () => {
  const router = useRouter();
  const { companyJobs } = useSelector((state) => state.job);
  return (
    <div>
      <header className="p-0">
        <div className="banner text-center">
          <div className="mx-1">
            <h1 id="h" className="fw-bold display-4 text-uppercase">
              Job List of{" "}
              {companyJobs && companyJobs.data
                ? companyJobs.data[0].company
                : "N/A"}
            </h1>
            <p id="hh" className="mt-4">
              Total{" "}
              {companyJobs && companyJobs.data ? companyJobs.data.length : 0}{" "}
              Job(s).
            </p>
          </div>
        </div>
      </header>
      <div className="content-section main-border-sides main-border-top">
        <div
          className="my-wrapper px-0 p-md-2 pt-2 pt-md-4"
          style={style.sectionHeight}
        >
          <div className="job-list mt-4">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Job Position and Company</th>
                  <th>Location</th>
                  <th>Tags</th>
                  <th>Posted</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {companyJobs &&
                  companyJobs.data &&
                  companyJobs.data.length <= 0 && (
                    <tr className="text-center">
                      <td colSpan={5}>No job found.</td>
                    </tr>
                  )}

                {companyJobs &&
                  companyJobs.data &&
                  companyJobs.data.map((job, index) => (
                    <tr
                      className="job-list-item"
                      key={index}
                      style={{ backgroundColor: job.job_higlight_color }}
                      onClick={(event) => {
                        if (event.metaKey || event.ctrlKey) {
                          const win = window.open(
                            `/jobs/show/${job.position_slug}/${job.id}`
                          );
                          win?.focus();
                        } else {
                          router.push(
                            `/jobs/show/${job.position_slug}/${job.id}`
                          );
                        }
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
                            <Image
                              src={job.company_logo}
                              alt="company-logo"
                              className="rounded paid_logo lazy"
                              width={50}
                              height={50}
                            />
                          )}
                          <div className="d-flex flex-column ps-2 align-middle">
                            <div className="job-title-mobile mb-auto">
                              <Link
                                href={`/jobs/show/${job.position_slug}/${job.id}`}
                              >
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
                              <Link
                                href={`/jobs/show/${job.position_slug}/${job.id}`}
                              >
                                <a style={style.link}>
                                  <h3 style={style.jobCompany}>
                                    {job.company}
                                  </h3>
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
                        <p
                          className="text-dark-grey"
                          style={style.jobPulishedTime}
                        >
                          {job.created_at}
                        </p>
                      </td>
                      <td className="align-middle d-none d-md-table-cell">
                        <p className="text-dark-grey">{job.is_active}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-3">
          <div className="d-flex justify-content-center mt-3">
            {companyJobs &&
              companyJobs.data &&
              companyJobs.data.length > 0 &&
              companyJobs.links &&
              companyJobs.meta && (
                <Paginate
                  data={{
                    links: companyJobs.links,
                    meta: companyJobs.meta,
                  }}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobList;
