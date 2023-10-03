import React, { Suspense, useEffect } from "react";
import "./assets/style/App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeDashboard from "pages/Home/HomeDashboard";
import ClassicCollectionDashboard from "pages/ClassicCollection/ClassicCollectionDashboard";
import AuthDashboard from "pages/Auth/AuthDashboard";
import NotFoundDashboard from "pages/NotFound/NotFoundDashboard";
import AppLayout from "pages/AppLayout/AppLayout";
import { LoadingSpinner, linksDetails, useCheckOneDayPassed } from "shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "pages/Checkout/CheckoutDashboard";
import { User, UserInfo, onAuthStateChanged } from "firebase/auth";
import {
  auth,
  createUserDocFromAuth,
  getUserDocFromAuth,
} from "utils/firebase";
import { setCurrentUser } from "store/user/userActions";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "store/localProducts/localProductsActions";
import GlobalStyle from "assets/style/GlobalStyle";
import ModernCollectionDashboard from "pages/ModernCollection/ModernCollectionDashboard";
import { ReactQueryProvider } from "utils/reactQuery/ReactQueryProvider";
import ProtectedRoute from "utils/routes/ProtectedRoute";
import UserSettingsDashboard from "pages/UserSettings/UserSettingsDashboard";
import UnAuthorizedRoute from "utils/routes/UnAuthorizedRoute";

function App() {
  const dispatch = useDispatch();
  const isOneDayPassed = useCheckOneDayPassed();

  useEffect(() => {
    if (Notification.permission !== "granted") Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (Notification.permission === "granted" && isOneDayPassed) {
      navigator.serviceWorker
        .getRegistration()
        .then((reg: ServiceWorkerRegistration | undefined) => {
          const options = {
            body: "Shopping is a joy with Phoenixe E-commerce",
            icon: `${window.location.origin}/favicon-32x32.png`,
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1,
            },
            actions: [
              {
                action: "close",
                title: "Close notification",
                icon: `${window.location.origin}/images/close.png`,
              },
            ],
          };
          reg?.showNotification("Phoenixe E-commerce", options);
        });
    }
  }, [isOneDayPassed]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        createUserDocFromAuth(user);
        getUserDocFromAuth(user);
      }
      if (user) {
        const userInfo: UserInfo = {
          displayName: (user as User).displayName,
          email: (user as User).email,
          phoneNumber: (user as User).phoneNumber,
          photoURL: (user as User).photoURL,
          providerId: (user as User).providerId,
          uid: (user as User).uid,
        };
        dispatch(setCurrentUser(userInfo));
      } else dispatch(setCurrentUser(null));
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<LoadingSpinner />}>
        <ReactQueryProvider>
          <Routes>
            <Route path="/" element={<AppLayout links={linksDetails} />}>
              <Route index element={<HomeDashboard />} />
              <Route path="classic-collection" element={<ClassicCollectionDashboard />} />
              <Route path="modern-collection" element={<ModernCollectionDashboard />} />
              <Route
                path="auth"
                element={
                  <UnAuthorizedRoute>
                    <AuthDashboard />
                  </UnAuthorizedRoute>
                }
              />
              <Route path="checkout" element={<Checkout />} />
              <Route
                path="user-settings"
                element={
                  <ProtectedRoute>
                    <UserSettingsDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/404" element={<NotFoundDashboard />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>
          </Routes>
        </ReactQueryProvider>
      </Suspense>

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
