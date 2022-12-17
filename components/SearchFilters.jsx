import { useState } from "react";
import Router from "next/router";

import { filterData, getFilterValues } from "../utils/filterData";
import { Select } from "@chakra-ui/react";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);

  const serachProperties = (filterValues) => {
    const path = Router.pathname;
    const { query } = Router;
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    Router.push({ pathname: path, query });
  };

  return (
    <div className="flex flex-wrap justify-center items-center  bg-white bg-opacity-10 m-6 py-3 shadow rounded-lg ">
      {filters.map((filter) => (
        <div key={filter.queryName}>
          <Select
            overflow="hidden"
            className="px-3 py-1 mx-4 my-2 w-[max] border border-blue-400 text-blue-400   bg-white bg-opacity-10 shadow rounded-lg"
            placeholder={filter.placeholder}
            onChange={(e) =>
              serachProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option
                value={item.value}
                key={item.value}
                className="text-black"
              >
                {item.name}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
};

export default SearchFilters;
