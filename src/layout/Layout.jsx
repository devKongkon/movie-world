import { Outlet } from "react-router-dom";
import { Footer, Header } from "../pages";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet/>
            <Footer/>
        </>
  )
};

export default Layout;
