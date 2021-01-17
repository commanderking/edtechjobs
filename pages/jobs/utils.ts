import { FilterOption } from "pages/jobs/types";
import _ from "lodash";

export const getInitialFilterState = (filters: FilterOption[]) => {
  return filters.reduce((stateMap, role) => {
    return {
      ...stateMap,
      [role.id]: false,
    };
  }, {});
};
