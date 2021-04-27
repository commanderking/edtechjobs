import { Role } from "features/jobs/types";

export const plausibleJobClick = (
  url: string,
  companyName: string,
  role: Role
) => {
  // @ts-ignore
  plausible("JOB_CLICK", { props: { url, companyName, role } });
};

export const filterClick = (filter: string) => {
  // @ts-ignore
  plausible("FILTER_CLICK", { props: { filter } });
};

export const meetupClick = (url: string) => {
  // @ts-ignore
  plausible("MEETUP_LINK", { props: { url } });
};
