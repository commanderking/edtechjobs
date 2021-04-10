import { FilterOption, Job, YearsExperience } from "features/jobs/types";
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

const isNewPost = (job: Job) => {
  if (job.sharedOn === "") {
    return true;
  }

  return false;
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

// There's probably a less explicit way through parsing range, but this is fairly
// explicit and I don't expect the age ranges to change too much
const toRelevantJobsForExperience = (
  activeYearsExperienceFilters: YearsExperience[]
) => (job: Job): boolean => {
  const { experienceSuggested } = job;
  if (experienceSuggested === "N/A") {
    return true;
  }

  if (activeYearsExperienceFilters.includes("0-2")) {
    return experienceSuggested >= 0 && experienceSuggested <= 2;
  }

  if (activeYearsExperienceFilters.includes("3-5")) {
    return experienceSuggested >= 3 && experienceSuggested <= 5;
  }

  if (activeYearsExperienceFilters.includes("6+")) {
    return experienceSuggested >= 6;
  }
};

const getFilteredJobs = (
  jobs: Job[],
  roleFilters,
  targetGroupFilters,
  yearsExperienceFilters,
  showOnlyNewJobs
) => {
  const activeRoleFilters = getActiveFilters(roleFilters);
  const activeTargetGroupFilters = getActiveFilters(targetGroupFilters);
  const activeYearsExperienceFilters = getActiveFilters(yearsExperienceFilters);

  const companiesById = _.keyBy(companies, "id");

  let filteredJobs = showOnlyNewJobs
    ? jobs.filter((job) => !job.sharedOn)
    : jobs;

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
    });
  }

  if (activeYearsExperienceFilters.length) {
    filteredJobs = filteredJobs.filter(
      toRelevantJobsForExperience(activeYearsExperienceFilters)
    );
  }

  return filteredJobs.map((job) => {
    return {
      ...job,
      companyDetails: companiesById[job.company],
      isNewPost: isNewPost(job),
      experienceSuggested: getExperienceSuggested(job.experienceSuggested),
    };
  });
};

const getExperienceSuggested = (years: number | string) => {
  if (years === "N/A") {
    return "Any";
  }

  return `${years}+ years`;
};

export const getCompanyWithJobs = (
  jobs: Job[],
  roleFilters,
  targetGroupFilters,
  yearsExperienceFilters,
  showOnlyNewJobs
) => {
  const filteredJobs = getFilteredJobs(
    jobs,
    roleFilters,
    targetGroupFilters,
    yearsExperienceFilters,
    showOnlyNewJobs
  );

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
