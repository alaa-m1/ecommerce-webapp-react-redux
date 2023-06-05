import React, { useEffect } from "react";
import "./assets/style/App.scss";
import { Route, Routes } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "pages/Home";
import Shop from "pages/Shop";
import Auth from "pages/Auth";
import { categoriesRes, linksDetails } from "shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "pages/Checkout";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserDocFromAuth } from "utils/firebase";
import { setCurrentUser } from "store/user/userActions";
import { useDispatch } from "react-redux";
import { mapCategory } from "utils/mappingFunctions/mapCategory";
import { setCategories } from "store/categories/categoriesActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  useEffect(() => {
    // const mappedRest = mapCategory(categoriesRes);
    dispatch(setCategories(categoriesRes));
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout links={linksDetails} />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Auth />} />
          <Route path="checkout" element={<Checkout />} />
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
