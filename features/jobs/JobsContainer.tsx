import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Button,
  Divider,
  SimpleGrid,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import FilterStack from "features/jobs/components/FilterStack";
import JobCard from "features/jobs/components/JobCard";
import CompanyCard from "features/jobs/components/CompanyCard";
import { roles, targetGroups, experienceLevels } from "features/jobs/constants";

import {
  getInitialFilterState,
  getCompanyWithJobs,
  shuffle,
} from "features/jobs/utils";
import { data } from "data/data_03_14_21";

const JobsContainer = () => {
  // Overall, this structure of separate state for different filter clicks likely
  // won't scale well. Likely want a piece of state that takes all filters
  // [{ filterType: "role", value: "pm "}, ...]
  // and then parse later with util
  const [clickedRoles, setClickedRoles] = useState(
    getInitialFilterState(roles)
  );

  const [clickedTargetGroups, setClickedTargetGroups] = useState(
    getInitialFilterState(targetGroups)
  );

  const [clickedYearsExperience, setClickedYearsExperience] = useState(
    getInitialFilterState(experienceLevels)
  );
  const [companies, setCompanies] = useState([]);

  // Important to shuffle inside useEffect because of server side rendering
  // Doing outside will result in text not matching server text
  // https://github.com/vercel/next.js/issues/3108
  useEffect(() => {
    setCompanies(
      shuffle(
        getCompanyWithJobs(
          // @ts-ignore - data is read only currently - Job is mutable?
          data,
          clickedRoles,
          clickedTargetGroups,
          clickedYearsExperience
        )
      )
    );
  }, [data, clickedRoles, clickedTargetGroups, clickedYearsExperience]);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Find edtech jobs and companies in the Boston area"
        />

        <title>Boston EdTech Companies and Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box maxWidth="824px" margin="auto" padding="20px" mt={10}>
          <Box justifyContent="center" textAlign="center" mb={15}>
            <Box>
              <Heading size="xl" mb="2">
                Find your career in Boston edtech
              </Heading>
              <Text>
                Created by the{" "}
                <Link
                  color="blue.500"
                  href="https://www.meetup.com/Boston-EdTech-Meetup/"
                  isExternal
                >
                  Boston EdTech Meetup
                </Link>{" "}
              </Text>
              <Text>
                Updated about every two weeks (Last updated - 2/28/2021)
              </Text>
              <Box mt={4}>
                <a
                  href="https://share.hsforms.com/1llEukeA6S8W3GJyxOxXUTg1o8no"
                  target="_blank"
                >
                  <Button mb={5} variant="outline" colorScheme="red">
                    Sign up For Job Updates
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
          <Box padding={4} border="1px solid lightgray">
            <Heading size="md">Filter by Job and Company Info</Heading>
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
            <FilterStack
              label={
                <React.Fragment>
                  <Text as="span" fontSize="xl" textAlign="left" mr={2}>
                    {"Experience"}
                  </Text>
                  <Popover>
                    <PopoverTrigger>
                      <WarningIcon color="red.500" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <Box padding={5}>
                        This is the years of experience listed on the job
                        posting, but please use it more as a guideline than a
                        hard requirement! If you think you're a good fit,
                        consider applying anyway!
                      </Box>
                    </PopoverContent>
                  </Popover>
                </React.Fragment>
              }
              filters={experienceLevels}
              clickedFilters={clickedYearsExperience}
              setClickedFilters={setClickedYearsExperience}
            />
          </Box>
          <Heading size="xl" mt={20} mb={2}>
            Companies and Jobs
          </Heading>

          <Box padding={4} border="1px solid lightgray">
            {companies.map((company) => {
              return (
                <Box mb={10} key={company.id}>
                  <CompanyCard companyWithJobs={company} />
                  <SimpleGrid spacing="20px" minChildWidth={"250px"}>
                    {company.jobs.map((job) => {
                      // @ts-ignore - need to coerce string value of targetGroup from raw data to Enum
                      return <JobCard jobDetail={job} key={job.link} />;
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
