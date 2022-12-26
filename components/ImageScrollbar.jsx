import { useContext } from "react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Icon } from "@chakra-ui/react";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center w-[px] ">
      <Icon
        as={FcPrevious}
        onClick={() => scrollPrev()}
        cursor="pointer"
        className=" m-2 shadow rounded-full p-1 bg-white text-[15px] sm:text-[30px]"
      />
    </div>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center  ">
      <Icon
        as={FcNext}
        onClick={() => scrollNext()}
        cursor="pointer"
        className=" m-2 shadow rounded-full p-1 bg-white text-[15px] sm:text-[30px]  "
      />
    </div>
  );
};

const ImageScrollbar = ({ data }) => (
  <ScrollMenu
    LeftArrow={LeftArrow}
    RightArrow={RightArrow}
    style={{ overflow: "hidden" }}
    className=""
  >
    {data.map((item) => (
      <div
        key={item.id}
        itemId={item.id}
        className=" overflow-hidden p-1 sm:w-[900px] w-[230px] h-[250px] sm:h-[650px]   "
      >
        <Image
          alt="property"
          placeholder="blur"
          blurDataURL={item.url}
          src={item.url}
          width={1000}
          height={500}
          sizes="(max-width:500px) 200px, (max-width:1023px) 400px, 1000px "
          className="h-[250px] sm:h-[650px] "
        />
      </div>
    ))}
  </ScrollMenu>
);

export default ImageScrollbar;
