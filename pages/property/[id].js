import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { fetchApi, baseUrl } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";
import Image from "next/image";

const PropertyDetails = ({
  PropertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <div className="px-4 py-2">
    <div className=" flex flex-wrap justify-center   items-center my-4 mb-5  p-4  shadow-[-3px_-3px_10px_rgb(96_165_250_/_50),3px_3px_10px_rgb(96_165_250_/_50)]  shadow-blue-400 rounded-lg border-1">
      <div className="max-w-[1000px] m-auto p-4 shadow  bg-white bg-opacity-10 rounded-lg ">
        {photos && <ImageScrollbar data={photos} />}
        <div className="p-6 mx-6">
          <div className=" flex pt-2 text-[] justify-between">
            <div className="flex items-center ">
              <div className=" pr-3 text-green-400">
                {isVerified && <GoVerified />}
              </div>
              <div className="font-bold text-sm sm:text-xl text-white">
                AED {millify(price)}
                {rentFrequency && ` ${rentFrequency}`}
              </div>
            </div>
            <div>
              <Image
                alt=""
                src={agency?.logo?.url}
                width={100}
                height={100}
                className="flex h-[30px] sm:h-[50px] "
              />
            </div>
          </div>
          <div className=" ">
            <div className="flex items-center p-1 justify-between text-[15px] w-[170px] sm:w-[250px] text-blue-400">
              {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
              <BsGridFill />
            </div>
            <div className=" text-2xl font-bold sm:text-lg text-yellow-100">
              {title}
            </div>
          </div>
          <div className="py-2 flex items-center text-yellow-50">
            {description}
          </div>
          <div className=" flex flex-wrap uppercase justify-between">
            <div className="flex justify-between w-[400px] border-b-[1px] border-yellow-100 p-3">
              <p className=" text-yellow-100">Type</p>
              <p className="font-bold  text-yellow-100">{type}</p>
            </div>
            <div className="flex justify-between w-[400px] border-b-[1px] border-yellow-100 p-3">
              <p className=" text-yellow-100">Purpose</p>
              <p className="font-bold  text-yellow-100">{purpose}</p>
            </div>
            {furnishingStatus && (
              <div className="flex justify-between w-[400px] border-b-[1px] border-yellow-100 p-3">
                <p className=" text-yellow-100">Furnishing Status</p>
                <p className="font-bold  text-yellow-100">{furnishingStatus}</p>
              </div>
            )}
          </div>
          <div>
            {amenities.length && (
              <p className="font-bold text-2xl text-yellow-100 mt-5 ">
                Amenities
              </p>
            )}
            <div className="flex flex-wrap ">
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <p
                    key={amenity.text}
                    className="font-bold text-blue-400 text-l m-1 border px-2 py-1 rounded border-blue-400"
                  >
                    {amenity.text}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      PropertyDetails: data,
    },
  };
}
