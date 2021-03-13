import { Box, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Head from "next/head";

const JobShareContainer = () => {
  return (
    <Box>
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
      <Box>
        <iframe
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
