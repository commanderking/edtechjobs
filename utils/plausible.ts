export const plausibleJobClick = (url: string, companyName: string) => {
  // @ts-ignore
  plausible("JOB_CLICK", { props: { url, companyName } });
};

export const filterClick = (filter: string) => {
  // @ts-ignore
  plausible("FILTER_CLICK", { props: { filter } });
};

export const meetupClick = () => {
  // @ts-ignore
  plausible("MEETUP_LINK");
};
