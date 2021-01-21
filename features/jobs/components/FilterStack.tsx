import { Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
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
    <Stack
      spacing={4}
      direction={["column", "row"]}
      align="center"
      mt={4}
      mb={4}
    >
      <Text fontSize="xl">{label}</Text>
      {filters.map((filter, index) => {
        return (
          <FilterButton
            key={filter.id}
            onClick={() => {
              const newClickedState = clickedFilters[filter.id] ? false : true;
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
        );
      })}
    </Stack>
  );
};

export default FilterStack;
