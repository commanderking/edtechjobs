import { useState } from "react";
import Head from "next/head";
import { Heading, Box, Center } from "@chakra-ui/react";
import FilterStack from "pages/jobs/components/FilterStack";
import { roles, targetGroups } from "pages/jobs/constants";

import { getInitialFilterState } from "pages/jobs/utils";
const JobsContainer = () => {
  const [clickedRoles, setClickedRoles] = useState(
    getInitialFilterState(roles)
  );

  const [clickedTargetGroups, setClickedTargetGroups] = useState(
    getInitialFilterState(targetGroups)
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box justifyContent="center">
          <Center>
            <Heading as="h1" size="2xl" mb="2">
              Make your impact in edtech
            </Heading>
          </Center>
          <Center>
            <p>Get started by editing </p>
          </Center>
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
      </main>
    </div>
  );
};

export default JobsContainer;
