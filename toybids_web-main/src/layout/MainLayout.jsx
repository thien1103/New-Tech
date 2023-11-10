import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="w-full h-full ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
