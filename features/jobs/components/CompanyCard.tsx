import {
  Heading,
  Box,
  Button,
  Divider,
  Grid,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { CompanyWithJobs } from "features/jobs/types";
type Props = {
  companyWithJobs: CompanyWithJobs;
};

const CompanyCard = ({ companyWithJobs }: Props) => {
  const { name, description, logo } = companyWithJobs;
  return (
    <Box mb={5}>
      {/* <Avatar src={logo} size="2xl" /> */}

      <Heading size="lg">{name}</Heading>
      <Text>{description}</Text>
    </Box>
  );
};

export default CompanyCard;
