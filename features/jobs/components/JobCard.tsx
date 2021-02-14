import { Box, Heading, Text, Avatar, Badge } from "@chakra-ui/react";
import { JobDetail } from "features/jobs/types";
import { plausibleJobClick } from "utils/plausible";

type Props = {
  jobDetail: JobDetail;
};

const JobCard = ({ jobDetail }: Props) => {
  const {
    name,
    link,
    location,
    companyDetails,
    role,
    isNewPost,
    experienceSuggested,
  } = jobDetail;
  return (
    <a
      href={link}
      target="_blank"
      onClick={() => {
        plausibleJobClick(link, companyDetails.name, role);
      }}
    >
      <Box
        p={5}
        height="100%"
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        textAlign="center"
        maxWidth="400px"
      >
        <Heading fontSize="lg">
          {name}
          {isNewPost && (
            <Badge colorScheme="green" ml={1}>
              New
            </Badge>
          )}
        </Heading>
        <Text>{location}</Text>
        <Text>
          Experience Level: <Badge>{experienceSuggested}</Badge>
        </Text>
      </Box>
    </a>
  );
};

export default JobCard;
