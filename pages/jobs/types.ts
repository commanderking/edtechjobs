export type FilterOption = {
  id: string;
  name: string;
};

export type Roles = FilterOption;

type Department = "engineer" | "pm" | "designer";

type targetGroups = "k12" | "highered" | "workforce";

export type Job = {
  company: string;
  name: string;
  department: Department;
  role: string;
  link: string;
  location: string;
};

export type Company = {
  id: string;
  name: string;
  description: string;
  targetGroups: string;
  logo: string;
};

export type JobDetail = Job & {
  companyDetails: Company;
};
