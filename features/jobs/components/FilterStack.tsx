import { Stack, Text, Wrap, WrapItem, Box, Divider } from "@chakra-ui/react";
import { FilterOption } from "features/jobs/types";
import FilterButton from "features/jobs/components/FilterButton";

type Props = {
  filters: FilterOption[];
  clickedFilters: Object;
  setClickedFilters: any;
  label: string;
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
        <Text fontSize="xl" textAlign="left" mr={4}>
          {label}
        </Text>
      </Box>
      <Wrap>
        {filters.map((filter, index) => {
          return (
            <WrapItem key={filter.id}>
              <FilterButton
                onClick={() => {
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
