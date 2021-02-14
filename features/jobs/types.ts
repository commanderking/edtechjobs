export type FilterOption = {
  id: string;
  name: string;
};

export type Roles = FilterOption;

export type Role = "engineer" | "pm" | "designer";

type TargetGroup = "k12" | "highered" | "workforce";

type YearsExperience = "0-2" | "3-5" | "6+";

export type Job = {
  company: string;
  name: string;
  role: Role;
  link: string;
  location: string;
  sharedOn: string;
  experienceSuggested: string | number;
};

export type Company = {
  id: string;
  name: string;
  description: string;
  targetGroups: TargetGroup[];
  logo: string;
};

export type JobDetail = Job & {
  companyDetails: Company;
  isNewPost: boolean;
  experienceSuggested: number | "-";
};

export type CompanyWithJobs = Company & {
  jobs: Job[];
};
