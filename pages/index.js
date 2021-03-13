import JobsContainer from "features/jobs/JobsContainer";

export default function Home({ lastUpdate }) {
  return <JobsContainer lastUpdate={lastUpdate} />;
}
