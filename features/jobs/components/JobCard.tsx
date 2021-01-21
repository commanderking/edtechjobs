import { Box, Heading, Text, Avatar } from "@chakra-ui/react";
import { JobDetail } from "features/jobs/types";
import { externalLinkEvent } from "utils/gtag";
type Props = {
  jobDetail: JobDetail;
};

// department: Department;
// role: string;
// link: string;
// location: string;

const JobCard = ({ jobDetail }: Props) => {
  const { name, link, location, companyDetails } = jobDetail;
  return (
    <a href={link} target="_blank" onClick={() => externalLinkEvent(link)}>
      <Box
        p={5}
        height="100%"
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        textAlign="center"
        maxWidth="400px"
        // margin={["inherit", "auto", "auto"]}
      >
        <Avatar src={companyDetails.logo} size="2xl" />
        <Heading fontSize="lg">{name}</Heading>
        <Text mt={4}>{companyDetails.name}</Text>
      </Box>
    </a>
  );
};

export default JobCard;
