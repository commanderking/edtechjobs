const goals = {
  JOB_CLICK: "JOB_CLICK",
};

export const plausibleJobClick = (url: string) => {
  // @ts-ignore
  plausible("JOB_CLICK", { props: { url } });
};
