import React, { useEffect } from "react";
import "./assets/style/App.scss";
import { Route, Routes } from "react-router-dom";
import HomeDashboard from "pages/Home/HomeDashboard";
import ShopDashboard from "pages/Shop/ShopDashboard";
import AuthDashboard from "pages/Auth/AuthDashboard";
import NotFoundDashboard from "pages/NotFound/NotFoundDashboard";
import AppLayout from "pages/AppLayout/AppLayout";
import { linksDetails } from "shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "pages/Checkout/CheckoutDashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserDocFromAuth } from "utils/firebase";
import { setCurrentUser } from "store/user/userActions";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "store/categories/categoriesActions";
import GlobalStyle from "assets/style/GlobalStyle";

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
    dispatch(fetchCategoriesAsync() as any);
  }, [dispatch]);
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<AppLayout links={linksDetails} />}>
          <Route index element={<HomeDashboard />} />
          <Route path="shop" element={<ShopDashboard />} />
          <Route path="auth" element={<AuthDashboard />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFoundDashboard />} />
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
