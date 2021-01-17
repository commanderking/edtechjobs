import { Stack, Text } from "@chakra-ui/react";
import { FilterOption } from "pages/jobs/types";
import FilterButton from "pages/jobs/components/FilterButton";

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
    <Stack spacing={4} direction="row" align="center">
      <Text fontSize="xl">{label}</Text>
      {filters.map((filter, index) => {
        return (
          <FilterButton
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
