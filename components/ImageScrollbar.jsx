import { useContext } from "react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Icon } from "@chakra-ui/react";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center  ">
      <Icon
        as={FcPrevious}
        onClick={() => scrollPrev()}
        fontSize="30px"
        cursor="pointer"
        className=" m-2 shadow rounded-full p-1 bg-white "
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
        fontSize="30px"
        cursor="pointer"
        className=" m-2 shadow rounded-full p-1 bg-white "
      />
    </div>
  );
};

const ImageScrollbar = ({ data }) => (
  <ScrollMenu
    LeftArrow={LeftArrow}
    RightArrow={RightArrow}
    style={{ overflow: "hidden" }}
  >
    {data.map((item) => (
      <div
        key={item.id}
        itemId={item.id}
        className="overflow-hidden p-1 w-[900px]"
      >
        <Image
          alt="property"
          placeholder="blur"
          blurDataURL={item.url}
          src={item.url}
          width={1000}
          height={500}
          sizes="(max-width:500px) 100px, (max-width:1023px) 400px, 1000px"
        />
      </div>
    ))}
  </ScrollMenu>
);

export default ImageScrollbar;
