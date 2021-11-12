import { Box, Heading } from "@chakra-ui/react";
import _ from "lodash";
import CompanyCard from "features/jobs/components/CompanyCard";
import { companies } from "constants/companies";

export const Companies = () => {
  const sortedCompanies = _.sortBy(companies, ["name"]);
  return (
    <Box m={10} mt={5}>
      {sortedCompanies.map((company) => {
        return (
          <Box>
            <CompanyCard company={company} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Companies;
