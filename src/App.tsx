import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeDashboard from "pages/Home/HomeDashboard";
import ClassicCollectionDashboard from "pages/ClassicCollection/ClassicCollectionDashboard";
import AuthDashboard from "pages/Auth/AuthDashboard";
import NotFoundDashboard from "pages/NotFound/NotFoundDashboard";
import AppLayout from "pages/AppLayout/AppLayout";
import { linksDetails } from "shared";
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
import ModernCollectionDashboard from "pages/ModernCollection/ModernCollectionDashboard";
import ProtectedRoute from "utils/routes/ProtectedRoute";
import UserSettingsDashboard from "pages/UserSettings/UserSettingsDashboard";
import UnAuthorizedRoute from "utils/routes/UnAuthorizedRoute";
import TermsDashboard from "pages/Terms/TermsDashboard";

function App() {
  const dispatch = useDispatch();
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
    <Routes>
      <Route path="/" element={<AppLayout links={linksDetails} />}>
        <Route index element={<HomeDashboard />} />
        <Route
          path="classic-collection"
          element={<ClassicCollectionDashboard />}
        />
        <Route
          path="modern-collection"
          element={<ModernCollectionDashboard />}
        />
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
        <Route path="/terms" element={<TermsDashboard />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Route>
    </Routes>
  );
}

export default App;
