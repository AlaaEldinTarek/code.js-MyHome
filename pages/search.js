import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FcFilledFilter } from "react-icons/fc";

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noresult from "../assets/images/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";

const search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <div className="px-4  text-white">
      <div
        className="flex justify-center items-center text-xl font-bold p-2 mb-4 drop-shadow cursor-pointer text-blue-400"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        Search Property By Filters
        <FcFilledFilter className="pl-3 text-[35px]" />
      </div>
      <div className=" m-0 mb-10  py-3 shadow-[-3px_-3px_10px_rgb(96_165_250_/_50),3px_3px_10px_rgb(96_165_250_/_50)]  shadow-blue-400 rounded-lg border-1">
        {searchFilters && <SearchFilters />}
        <div className="text-2xl p-4 font-bold ml-3  text-blue-400">
          Properties {router.query.purpose}
        </div>
        <div className="flex justify-center items-center flex-wrap">
          {properties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </div>
        {properties.length === 0 && (
          <div className="flex flex-col justify-center items-center text-center mt-5 mb-5">
            <Image alt="no result" width={1000} src={noresult} />
            <div className=" text-2xl mt-3 ">No Result Found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
