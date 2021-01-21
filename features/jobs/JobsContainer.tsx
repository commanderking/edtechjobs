import { useState } from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Button,
  Divider,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import FilterStack from "features/jobs/components/FilterStack";
import JobCard from "features/jobs/components/JobCard";
import CompanyCard from "features/jobs/components/CompanyCard";
import { roles, targetGroups } from "features/jobs/constants";

import {
  getInitialFilterState,
  getFormattedJobs,
  getCompanyWithJobs,
} from "features/jobs/utils";
import { data } from "data/data_01_16_21";
import { event } from "utils/gtag";

const JobsContainer = () => {
  const [clickedRoles, setClickedRoles] = useState(
    getInitialFilterState(roles)
  );

  const [clickedTargetGroups, setClickedTargetGroups] = useState(
    getInitialFilterState(targetGroups)
  );

  // @ts-ignore - data is read only currently - Job is mutable?
  const jobs = getFormattedJobs(data, clickedRoles, clickedTargetGroups);

  // @ts-ignore - data is read only currently - Job is mutable?
  const companies = getCompanyWithJobs(data, clickedRoles, clickedTargetGroups);

  console.log("jobs", jobs);
  return (
    <div>
      <Head>
        <title>Boston EdTech Companies and Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box maxWidth="824px" margin="auto" padding="20px" mt={10}>
          <Box justifyContent="center" textAlign="center">
            <Heading size="xl" mb="2">
              Make your impact in Boston's edtech ecosystem
            </Heading>
            <Text>Last updated - 1/18/2021 </Text>
            <a
              href="https://share.hsforms.com/1llEukeA6S8W3GJyxOxXUTg1o8no"
              target="_blank"
              onClick={() =>
                event({
                  action: "click_sign_up",
                  category: "click_sign_up",
                  label: "event_click",
                  value: 1,
                })
              }
            >
              <Button>Sign up For Job Updates</Button>
            </a>
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
          </Box>
          <Box>
            <Heading size="xl" mb={2} mt={20}>
              Companies and Jobs
            </Heading>
            <Divider mb={4} />

            {companies.map((company) => {
              return (
                <Box mb={10}>
                  <CompanyCard companyWithJobs={company} />
                  <SimpleGrid
                    // templateColumns="1fr 1fr 1fr"
                    // gap={6}
                    // gridAutoRows="1fr"
                    spacing="40px"
                    minChildWidth={"250px"}
                  >
                    {company.jobs.map((job) => {
                      // @ts-ignore - need to coerce string value of targetGroup from raw data to Enum
                      return <JobCard jobDetail={job} />;
                    })}
                  </SimpleGrid>
                  <Divider mt={10} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default JobsContainer;
