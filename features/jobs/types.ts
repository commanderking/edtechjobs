export type FilterOption = {
  id: string;
  name: string;
};

export type Roles = FilterOption;

type Role = "engineer" | "pm" | "designer";

type TargetGroup = "k12" | "highered" | "workforce";

export type Job = {
  company: string;
  name: string;
  role: Role;
  link: string;
  location: string;
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
};
