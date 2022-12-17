import Head from "next/head";
import Footer from "./Footer";
import Navbarr from "./Navbarr";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>My House</title>
      </Head>
      <div className="container">
        <header>
          <Navbarr />
        </header>
        <main>{children}</main>
        <footer><Footer/></footer>
      </div>
    </div>
  );
};

export default Layout;
