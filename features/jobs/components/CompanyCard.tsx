import { Heading, Box, Text, Avatar, Stack } from "@chakra-ui/react";
import { CompanyWithJobs } from "features/jobs/types";
type Props = {
  companyWithJobs: CompanyWithJobs;
};

const CompanyCard = ({ companyWithJobs }: Props) => {
  const { name, description, logo } = companyWithJobs;
  return (
    <Stack direction={["column", "row"]} align="center" mb={5}>
      <Box>
        <Avatar src={logo} size="2xl" />
      </Box>
      <Box mb={5}>
        <Heading size="lg">{name}</Heading>
        <Text>{description}</Text>
      </Box>
    </Stack>
  );
};

export default CompanyCard;
