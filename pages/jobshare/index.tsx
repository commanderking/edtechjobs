import JobShareContainer from "features/jobshare/JobShareContainer";
import { AppProps } from "types/App";
export default function JobShare({ lastUpdate }: AppProps) {
  console.log("lastUpdate", lastUpdate);
  return <JobShareContainer lastUpdate={lastUpdate} />;
}
