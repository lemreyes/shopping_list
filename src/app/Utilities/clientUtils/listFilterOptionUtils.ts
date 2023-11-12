import { FilterOptions } from "@/app/[User]/Lists/Components/FilterPanel";
import { ListFilterDefinitions } from "@/app/Types/Enums";

export function convFilterOptionObjectToNumber(filterOptions: FilterOptions) {
  let outNum = 0b00000000;
  const values = Object.values(filterOptions);

  for (let i = 0; i < values.length; i++) {
    outNum = outNum | (values[i] ? 0b00000001 << i : 0);
  }

  return outNum;
}

export function convNumberToFilterOptionObject(inputNum: number) {
  const filterOptions = {
    open: inputNum & ListFilterDefinitions.SelectOpen ? true : false,
    archived: inputNum & ListFilterDefinitions.SelectArchive ? true : false,
  };

  return filterOptions;
}
