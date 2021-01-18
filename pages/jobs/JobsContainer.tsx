import { useState } from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Center,
  Button,
  Divider,
  Grid,
  Text,
} from "@chakra-ui/react";
import FilterStack from "pages/jobs/components/FilterStack";
import JobCard from "pages/jobs/components/JobCard";
import { roles, targetGroups } from "pages/jobs/constants";

import { getInitialFilterState, getFormattedJobs } from "pages/jobs/utils";
import { data } from "data/data_01_16_21.js";

const JobsContainer = () => {
  const [clickedRoles, setClickedRoles] = useState(
    getInitialFilterState(roles)
  );

  const [clickedTargetGroups, setClickedTargetGroups] = useState(
    getInitialFilterState(targetGroups)
  );

  const jobs = getFormattedJobs(data, clickedRoles, clickedTargetGroups);
  console.log("jobs", jobs);

  return (
    <div>
      <Head>
        <title>Boston EdTech Companies and Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box justifyContent="center" textAlign="center">
          <Heading size="xl" mb="2">
            Make your impact in Boston's edtech ecosystem
          </Heading>
          <Text>Last updated - 1/18/2021 </Text>
          <FilterStack
            label="Role"
            filters={roles}
            clickedFilters={clickedRoles}
            setClickedFilters={setClickedRoles}
          />
          <FilterStack
            label="Target Group"
            filters={targetGroups}
            clickedFilters={clickedTargetGroups}
            setClickedFilters={setClickedTargetGroups}
          />
          <a
            href="https://share.hsforms.com/1llEukeA6S8W3GJyxOxXUTg1o8no"
            target="_blank"
          >
            <Button>Sign up For Updates</Button>
          </a>
        </Box>
        <Divider />
        <Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} gridAutoRows="1fr">
            {jobs.map((job) => {
              return <JobCard jobDetail={job} />;
            })}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default JobsContainer;
