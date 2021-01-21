import { FilterOption, Job } from "features/jobs/types";
import _ from "lodash";
import { companies } from "constants/companies";
export const getInitialFilterState = (filters: FilterOption[]) => {
  return filters.reduce((stateMap, role) => {
    return {
      ...stateMap,
      [role.id]: false,
    };
  }, {});
};

const getActiveFilters = (filters: { [key: string]: boolean }) => {
  const activeFilters = [];
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      activeFilters.push(key);
    }
  }
  return activeFilters;
};

const getFilteredJobs = (jobs: Job[], roleFilters, targetGroupFilters) => {
  const activeRoleFilters = getActiveFilters(roleFilters);
  const activeTargetGroupFilters = getActiveFilters(targetGroupFilters);

  const companiesById = _.keyBy(companies, "id");

  let filteredJobs = jobs;

  if (activeRoleFilters.length) {
    filteredJobs = filteredJobs.filter((job) =>
      activeRoleFilters.includes(job.role)
    );
  }

  if (activeTargetGroupFilters.length) {
    console.log("filteredJobs", filteredJobs);
    console.log("companiesById", companiesById);

    filteredJobs = filteredJobs.filter((job) => {
      const { company } = job;

      console.log("company", companiesById[company]);
      const targetGroupFiltered = companiesById[company].targetGroups.map(
        (group) => {
          return activeTargetGroupFilters.includes(group);
        }
      );

      console.log("targetGroupFiltered", targetGroupFiltered);

      return targetGroupFiltered.some(Boolean);
      //   return activeTargetGroupFilters.includes(
      //     companiesById[company].targetGroups
      //   );
    });
  }

  return filteredJobs.map((job) => {
    return {
      ...job,
      companyDetails: companiesById[job.company],
    };
  });
};

export const getFormattedJobs = (
  jobs: Job[],
  roleFilters,
  targetGroupFilters
) => {
  const filteredJobs = getFilteredJobs(jobs, roleFilters, targetGroupFilters);

  const jobByCompany = _.groupBy(filteredJobs, "company");

  const companiesWithJobs = _.map(jobByCompany, (companyJobs: any) => {
    return {
      ...companyJobs[0].companyDetails,
      jobs: companyJobs,
    };
  });

  console.log("companiesWithJobs", companiesWithJobs);

  return filteredJobs;
};

export const getCompanyWithJobs = (
  jobs: Job[],
  roleFilters,
  targetGroupFilters
) => {
  const filteredJobs = getFilteredJobs(jobs, roleFilters, targetGroupFilters);

  const jobByCompany = _.groupBy(filteredJobs, "company");

  const companiesWithJobs = _.map(jobByCompany, (companyJobs: any) => {
    return {
      ...companyJobs[0].companyDetails,
      jobs: companyJobs,
    };
  });

  return companiesWithJobs;
};
