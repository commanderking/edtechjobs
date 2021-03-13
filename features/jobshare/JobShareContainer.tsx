import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Head from "next/head";
import { LastUpdate } from "types/App";

type Props = {
  lastUpdate: LastUpdate;
};

const getNextUpdateDate = (lastUpdate) => {
  const newDate = new Date(lastUpdate);
  newDate.setDate(newDate.getDate() + 14);

  return newDate.toLocaleDateString();
};

const JobShareContainer = ({ lastUpdate }: Props) => {
  return (
    <Box>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta name="description" content="Share an edtech job" />

        <title>Boston EdTech - Share a Job</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Button
          variant="outline"
          colorScheme="red"
          leftIcon={<ArrowBackIcon />}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back
        </Button>
      </Box>
      <Box mt={8}>
        <Heading size="md">Share a Job</Heading>
        <Box mt={4}>
          <Text>
            Have a job posting you'd like to share with the Boston edtech
            community? Please share it here! We update our job board roughly
            every two weeks, so it'll be added in the next update, planned on{" "}
            <b>{getNextUpdateDate(lastUpdate)}</b>.
          </Text>
        </Box>
      </Box>
      <Box textAlign="center" mt={4}>
        <iframe
          style={{ margin: "auto" }}
          src="https://docs.google.com/forms/d/e/1FAIpQLSfypAnkTei-n84Ttgtql0Za1eO5xPiwcm_FuL5YolOUi-XDKg/viewform?embedded=true&headers=false"
          width="640"
          height="1066"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </Box>
    </Box>
  );
};

export default JobShareContainer;
