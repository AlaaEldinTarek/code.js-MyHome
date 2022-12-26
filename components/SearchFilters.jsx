import { useEffect, useState } from "react";
import Router from "next/router";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { MdCancel } from "react-icons/md";
import noresult from "../assets/images/noresult.svg";
import Image from "next/image";

const SearchFilters = () => {
  const [filters] = useState(filterData);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

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
      <Flex flexDir="column">
        <Button
          onClick={() => setShowLocations(!showLocations)}
          className="px-3 py-1 mx-4 my-2 w-[max] border border-blue-400 text-blue-400   bg-white bg-opacity-10 shadow rounded-lg"
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex
            pos="relative"
            paddingTop="2"
            className="flex flex-col justify-center items-center"
          >
            <Input
              placeholder="Type Here"
              value={searchTerm}
              w="200px"
              outline={0}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 mx-4 my-2 text-center text-base placeholder:text-yellow-100 text-blue-400 focus:outline-blue-400 focus:outline-[1px]   bg-white bg-opacity-10 shadow rounded-lg"
            />
            {searchTerm !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchTerm("")}
              />
            )}
            {loading && <Spinner margin="auto" marginTop="3" />}
            {showLocations && (
              <Box height="100px" width={200} overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      serachProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && searchTerm == "" && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    marginTop="5"
                    marginBottom="5"
                    className="text-yellow-100"
                  >
                    <Image alt="" src={noresult} className="w-[60px]" />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default SearchFilters;
