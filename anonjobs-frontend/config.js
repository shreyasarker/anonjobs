const config = {
  env: process.env.NODE_ENV,
  endpoints: {
    auth: {
      register: "/register",
      login: "/login",
      logout: "/logout",
      user: "/backend/users/me"
    },
    tags: {
      fetchTags: "/frontend/tags",
    },
    yearlySalaries: {
      fetchYearlySalaries: "/frontend/yearly-salaries",
    },
    jobs: {
      fetchJobs: "/frontend/jobs",
      jobTags: "/frontend/jobs/tags",
      store: "/backend/jobs",
      update: "/backend/jobs",
      fetchJob: "/frontend/jobs/show",
      fetchCompanyJobs: "/frontend/jobs/company",
    },
    employers: {
      fetchEmployerJobs: "/backend/employers/jobs",
    },
  },
};

export default config;
