import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import AllRoutes from "./Router/AllRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AllRoutes />
    <ToastContainer />
  </BrowserRouter>
);
