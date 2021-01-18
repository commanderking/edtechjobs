import { Box, Heading, Text, Avatar } from "@chakra-ui/react";
import { JobDetail } from "pages/jobs/types";

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
    <a href={link} target="_blank">
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        textAlign="center"
        //   {...rest}
      >
        <Avatar src={companyDetails.logo} size="2xl" />
        <Heading fontSize="xl">{name}</Heading>
        <Text mt={4}>{companyDetails.name}</Text>
      </Box>
    </a>
  );
};

export default JobCard;
