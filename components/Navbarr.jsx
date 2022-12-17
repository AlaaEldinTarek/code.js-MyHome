import Link from "next/link";
import { useState } from "react";
import {
  FcCollapse,
  FcExpand,
  FcHome,
  FcCurrencyExchange,
  FcSearch,
  FcKey,
} from "react-icons/fc";

import ActiveLink from "./ActiveLink";

export default function Nanbarr() {
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <nav className=" m-4  p-3    shadow-[-3px_-3px_10px_rgb(96_165_250_/_50),3px_3px_10px_rgb(96_165_250_/_50)]  shadow-blue-400 rounded-lg border-1">
        <div className="  justify-between items-center md:flex ">
          <div>
            <div className=" flex items-center justify-between text-3xl text-blue-400 font-bold ">
              <Link href="/" className="pl-3">
                My House
              </Link>
              <div className="md:hidden">
                <button
                  className="p-1 stroke-blue-400 rounded-md outline-none border-blue-400 border-2"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <FcCollapse /> : <FcExpand />}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <div>
                <ul className="items-center justify-center text-1xl  font-bold pr-3  md:flex md:space-x-2 md:space-y-0 space-y-2 ing-2">
                  <li className="text-blue-400    ">
                    <ActiveLink href="/" passHref>
                      <FcHome />
                      Home
                    </ActiveLink>
                  </li>
                  <li className="text-blue-400  ">
                    <ActiveLink href="/Search" passHref>
                      <FcSearch />
                      Search
                    </ActiveLink>
                  </li>
                  <li className="text-blue-400">
                    <ActiveLink href="/search?purpose=for-sale" passHref>
                      <FcCurrencyExchange />
                      Buy Proprty
                    </ActiveLink>
                  </li>
                  <li className="text-blue-400 ">
                    <ActiveLink href="/search?purpose=for-rent" passHref>
                      <FcKey />
                      Rent Proprty
                    </ActiveLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
