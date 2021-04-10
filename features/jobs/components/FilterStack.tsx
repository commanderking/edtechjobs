import { Stack, Text, Wrap, WrapItem, Box } from "@chakra-ui/react";
import { FilterOption } from "features/jobs/types";
import FilterButton from "features/jobs/components/FilterButton";
import { filterClick } from "utils/plausible";
type Props = {
  filters: FilterOption[];
  clickedFilters: Object;
  setClickedFilters: any;
  label: string | React.ReactNode;
};

const FilterStack = ({
  label,
  filters,
  clickedFilters,
  setClickedFilters,
}: Props) => {
  return (
    <Stack direction={["column", "row"]} align="center" mt={8} mb={8}>
      <Box>
        {typeof label === "string" ? (
          <Text fontSize="xl" textAlign="left" mr={4}>
            {label}
          </Text>
        ) : (
          label
        )}
      </Box>
      <Wrap>
        {filters.map((filter) => {
          return (
            <WrapItem key={filter.id}>
              <FilterButton
                onClick={() => {
                  filterClick(filter.id);
                  const newClickedState = clickedFilters[filter.id]
                    ? false
                    : true;
                  setClickedFilters({
                    ...clickedFilters,
                    [filter.id]: newClickedState,
                  });
                }}
                isClicked={clickedFilters[filter.id]}
                colorScheme="teal"
              >
                {filter.name}
              </FilterButton>
            </WrapItem>
          );
        })}
      </Wrap>
    </Stack>
  );
};

export default FilterStack;
