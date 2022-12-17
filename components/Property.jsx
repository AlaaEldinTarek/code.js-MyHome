import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/images/house.jpg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <div className=" flex-warp w-[210px] h-[250px] sm:w-[350px] sm:h-[330px]  m-2  p-4 cursor-pointer  shadow-lg bg-white bg-opacity-10  rounded-lg  drop-shadow">
        <div className="flex pr-3 w-[190px] h-[110px] sm:w-[330px] sm:h-[180px]">
          <Image
            src={coverPhoto ? coverPhoto.url : DefaultImage}
            width={400}
            height={260}
            alt="house"
            className="drop-shadow shadow rounded-lg hover:scale-90 transition duration-500 "
          />
        </div>
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
              className="flex h-[30px] sm:h-[50px] "
            />
          </div>
        </div>
        <div className=" ">
          <div className="flex items-center p-1 justify-between text-[15px] w-[170px] sm:w-[250px] text-blue-400">
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
            <BsGridFill />
          </div>
          <div className=" text-sm sm:text-lg text-yellow-100">
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Property;
