import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
// import Navbar from "../components/shared/Navbar";
// import Footer from "../components/shared/Footer";


const Main = () => {
  return (
    <div className="font-lancelot ">
      <Navbar />
      <div className="container mx-auto px-6 py-4">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;