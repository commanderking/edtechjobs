import { Box, Heading, Text, Avatar } from "@chakra-ui/react";
import { JobDetail } from "features/jobs/types";
type Props = {
  jobDetail: JobDetail;
};

const JobCard = ({ jobDetail }: Props) => {
  const { name, link, location, companyDetails } = jobDetail;
  return (
    <a href={link} target="_blank">
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
        <Avatar src={companyDetails.logo} size="2xl" />
        <Heading fontSize="lg">{name}</Heading>
        <Text>{location}</Text>
      </Box>
    </a>
  );
};

export default JobCard;
