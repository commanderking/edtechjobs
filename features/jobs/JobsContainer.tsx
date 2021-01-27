import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Button,
  Divider,
  SimpleGrid,
  Text,
  Link,
} from "@chakra-ui/react";
import FilterStack from "features/jobs/components/FilterStack";
import JobCard from "features/jobs/components/JobCard";
import CompanyCard from "features/jobs/components/CompanyCard";
import { roles, targetGroups } from "features/jobs/constants";

import {
  getInitialFilterState,
  getCompanyWithJobs,
  shuffle,
} from "features/jobs/utils";
import { data } from "data/data_01_16_21";

const JobsContainer = () => {
  const [clickedRoles, setClickedRoles] = useState(
    getInitialFilterState(roles)
  );

  const [clickedTargetGroups, setClickedTargetGroups] = useState(
    getInitialFilterState(targetGroups)
  );

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const companies = getCompanyWithJobs(
      // @ts-ignore - data is read only currently - Job is mutable?
      data,
      clickedRoles,
      clickedTargetGroups
    );

    setCompanies(shuffle(companies));
  }, [data, clickedRoles, clickedTargetGroups]);

  return (
    <div>
      <Head>
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
              <Text mb={5}>
                Created by the{" "}
                <Link
                  color="blue.500"
                  href="https://www.meetup.com/Boston-EdTech-Meetup/"
                  isExternal
                >
                  Boston EdTech Meetup
                </Link>{" "}
                (Last updated - 1/18/2021)
              </Text>
              <Box>
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
          </Box>
          <Heading size="xl" mt={20} mb={2}>
            Companies and Jobs
          </Heading>

          <Box padding={4} border="1px solid lightgray">
            {companies.map((company) => {
              return (
                <Box mb={10} key={company.id}>
                  <CompanyCard companyWithJobs={company} />
                  <SimpleGrid spacing="40px" minChildWidth={"250px"}>
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
