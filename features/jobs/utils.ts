import { FilterOption, Job } from "features/jobs/types";
import _ from "lodash";
import { companies } from "constants/companies";

export function shuffle(inputArray) {
  const array = [...inputArray];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
    filteredJobs = filteredJobs.filter((job) => {
      const { company } = job;

      const targetGroupFiltered = companiesById[company].targetGroups.map(
        (group) => {
          return activeTargetGroupFilters.includes(group);
        }
      );

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

  // Maybe this is bad UI wise, but it's nice to be equitable by shuffling random companies to the top
  return companiesWithJobs;
};
