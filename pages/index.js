import Image from "next/image";
import Link from "next/link";
import { baseUrl, fetchApi } from "../utils/fetchApi";

import Property from "../components/Property.jsx";
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <div className="">
    <div className="flex  flex-wrap justify-center items-center m-3   bg-white bg-opacity-10 p-3  shadow-lg rounded-lg  drop-shadow-md ">
      <Image
        src={imageUrl}
        width={500}
        height={300}
        alt="banner"
        className="drop-shadow shadow rounded-lg hover:scale-90 cursor-pointer transition duration-500"
      />
      <div className="p-3 text-3xl">
        <p className="text-blue-400 text-sm font-medium">{purpose}</p>
        <p className="text-1xl font-bold text-white ">
          {title1}
          <br />
          {title2}
        </p>
        <p className="text-lg pt-3 pb-3 text-yellow-100">
          {desc1}
          <br />
          {desc2}
        </p>
        <button className="text-xl text-white pl-4 pr-4 pt-2 pb-2 rounded-full tran  bg-blue-400 hover:ring-2 hover:ring-blue-400  hover:bg-transparent transition duration-500 ">
          <Link href={linkName} passHref>
            {buttonText}
          </Link>
        </button>
      </div>
    </div>
  </div>
);

export default function Home({ propertiesForRent, propertiesForSale }) {
  console.log(propertiesForRent, propertiesForSale);
  return (
    <div className="">
      <div className="p-4 ">
        <div className="flex flex-wrap justify-center  border-blue-400 items-center m-0 mb-10  py-3  w-full shadow-[-3px_-3px_10px_rgb(96_165_250_/_50),3px_3px_10px_rgb(96_165_250_/_50)]  shadow-blue-400 rounded-lg border-1 ">
          <div className="flex flex-wrap justify-center">
            <Banner
              purpose="RENT A HOME"
              title1="Rental Home For"
              title2="Everyone"
              desc1="Explore Apartments, Villas, Homes "
              desc2="and more"
              buttonText="Explore Renting"
              linkName="/search?purpose=for-rent"
              imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center m-0 p-3  ">
            {propertiesForRent.map((property) => (
              <Property property={property} key={property.id} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center  border-blue-400 items-center m-0 mb-10  py-3  w-full shadow-[-3px_-3px_10px_rgb(96_165_250_/_50),3px_3px_10px_rgb(96_165_250_/_50)]  shadow-blue-400 rounded-lg border-1">
          <div className="flex flex-wrap justify-center mt-10">
            <Banner
              purpose="BUY A HOME"
              title1="Find, Buy & Own Your"
              title2="Dream Home"
              desc1="Explore Apartments, Villas, Homes "
              desc2="and more"
              buttonText="Explore Buying"
              linkName="/search?purpose=for-sale"
              imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center m-0 p-3  ">
            {propertiesForSale.map((property) => (
              <Property property={property} key={property.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
