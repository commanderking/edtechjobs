import { Heading, Box, Text, Avatar, Stack, Link } from "@chakra-ui/react";
import { Company } from "features/jobs/types";
import { addUtmSource } from "features/jobs/utils";

type Props = {
  company: Company;
};

const CompanyCard = ({ company }: Props) => {
  const { name, description, logo } = company;
  return (
    <Stack direction={["column", "row"]} align="center" mb={5}>
      <Box>
        <Avatar src={logo} size="2xl" />
      </Box>
      <Box mb={5}>
        <Heading size="lg">{name}</Heading>
        <Text>{description}</Text>
        <Link
          color="blue.500"
          href={addUtmSource(company.jobBoardUrl)}
          isExternal
        >
          See Job Board
        </Link>{" "}
      </Box>
    </Stack>
  );
};

export default CompanyCard;
