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
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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
import data from "data/jobs.json";
import { LastUpdate } from "types/App";
import { filterClick } from "utils/plausible";
import Companies from "features/jobs/components/Companies";

type Props = {
  lastUpdate: LastUpdate;
};

const JobsContainer = ({ lastUpdate }: Props) => {
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

  const [showOnlyNewJobs, setShowOnlyNewJobs] = useState(false);

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
          clickedYearsExperience,
          showOnlyNewJobs
        )
      )
    );
  }, [
    data,
    clickedRoles,
    clickedTargetGroups,
    clickedYearsExperience,
    showOnlyNewJobs,
  ]);

  // Hide the filters and job specific links as we're no longer updating
  const showJobFilterAndIndividualJobs = false;

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
            {showJobFilterAndIndividualJobs && (
              <Box>
                <Text>
                  Updated about every two weeks (Last update -{" "}
                  {lastUpdate.toLocaleDateString()})
                </Text>
                <Stack
                  mt={4}
                  direction={["column", "row"]}
                  spacing="24px"
                  justify="center"
                >
                  <Box>
                    <a
                      href="https://share.hsforms.com/1llEukeA6S8W3GJyxOxXUTg1o8no"
                      target="_blank"
                    >
                      <Button variant="outline" colorScheme="red">
                        Sign up For Updates
                      </Button>
                    </a>
                  </Box>
                  <Box>
                    <a href="/jobshare">
                      <Button variant="outline" colorScheme="red">
                        Share a Job
                      </Button>
                    </a>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>

        {showJobFilterAndIndividualJobs && (
          <Box mt={5} padding={4} border="1px solid lightgray">
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

            <Checkbox
              size="lg"
              colorScheme="teal"
              onChange={(event) => {
                filterClick("new_jobs_only");
                setShowOnlyNewJobs(event.target.checked);
              }}
            >
              <Text fontSize="lg">
                Show Only New Jobs Since Last Update (
                {lastUpdate.toLocaleDateString()})
              </Text>
            </Checkbox>
          </Box>
        )}
        {/* <Alert mt={10} status="info" padding={5}>
          <AlertIcon />
          Boston EdTech Meetup is hosting a Job Fair on Tuesday, 5/25.{"  "}
          <Box ml={1}>
            <Link
              href="https://www.meetup.com/Boston-EdTech-Meetup/events/277741963/"
              isExternal
              onClick={() => {
                meetupClick(
                  "https://www.meetup.com/Boston-EdTech-Meetup/events/277741963/"
                );
              }}
            >
              Sign up here. <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </Alert> */}
        <Box padding={4} border="1px solid lightgray">
          <Companies />

          {/* {companies.map((company) => {
            return (
              <Box mb={10} key={company.id}>
                <CompanyCard company={company} />
                <SimpleGrid spacing="20px" minChildWidth={"250px"}>
                  {company.jobs.map((job) => {
                    // @ts-ignore - need to coerce string value of targetGroup from raw data to Enum
                    return <JobCard jobDetail={job} key={job.link} />;
                  })}
                </SimpleGrid>
                <Divider mt={10} />
              </Box>
            );
          })} */}
        </Box>
      </main>
    </div>
  );
};

export default JobsContainer;
