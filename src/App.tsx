import React from "react";
import "./assets/style/App.scss";
import { Route, Routes } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "pages/Home";
import Shop from "pages/Shop";
import Auth from "pages/Auth";
import { linksDetails } from "shared";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout links={linksDetails}/>}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
