import React from "react";
import "./assets/style/App.scss";
import { Route, Routes } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "pages/Home";
import Shop from "pages/Shop";
import Auth from "pages/Auth";
import { linksDetails } from "shared";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout links={linksDetails} />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
