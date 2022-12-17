import Link from "next/link";
import { useRouter } from "next/router";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    alignItems: router.asPath === href ? "center" : "center",
    justifyContent: router.asPath === href ? "center" : "center",
    transitionDuration: router.asPath === href ? "500ms" : "500ms",
    gap: router.asPath === href ? "0.75rem" : "0.75rem",
    borderRadius: router.asPath === href ? "9999px" : "",
    padding: router.asPath === href ? "0.5rem" : "",
    display: router.asPath === href ? "flex" : "flex",
    borderWidth: router.asPath === href ? "" : "",
    borderColor: router.asPath === href ? "rgb(96 165 250)" : "",
    boxShadow: router.asPath === href ? "2px 2px 5px rgb(96 165 250 / 1),-2px -2px 5px rgb(96 165 250 / 1)" : "",
    paddingLeft: router.asPath === href ? "16px" : "",
    paddingRight: router.asPath === href ? "16px" : "",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      style={style}
      className=" hover:ring-2 rounded-full  py-2 px-4  hover:drop-shadow-lg  transition duration-500 "
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
