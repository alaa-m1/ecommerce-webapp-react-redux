import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "pages/Home";
import Shop from "pages/Shop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
