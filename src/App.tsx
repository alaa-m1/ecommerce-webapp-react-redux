import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/Home/HomePage";
import ClassicCollectionPage from "pages/ClassicCollection/ClassicCollectionPage";
import AuthPage from "pages/Auth/AuthPage";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import AppLayout from "pages/AppLayout/AppLayout";
import { CategoriesListSkeleton, linksDetails } from "shared";
import Checkout from "pages/Checkout/CheckoutPage";
import { User, UserInfo, onAuthStateChanged } from "firebase/auth";
import {
  auth,
  createUserDocFromAuth,
  getUserDocFromAuth,
} from "utils/firebase";
import { setCurrentUser } from "store/user/userActions";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "store/localProducts/localProductsActions";
import ModernCollectionPage from "pages/ModernCollection/ModernCollectionPage";
import ProtectedRoute from "utils/routes/ProtectedRoute";
import UserDashboardPage from "pages/UserDashboard/UserDashboardPage";
import UnAuthorizedRoute from "utils/routes/UnAuthorizedRoute";
import TermsPage from "pages/Terms/TermsPage";

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
        <Route index element={<HomePage />} />
        <Route
          path="classic-collection"
          element={<ClassicCollectionPage />}
        />
        <Route
          path="modern-collection"
          element={
            <Suspense fallback={<CategoriesListSkeleton />}>
              <ModernCollectionPage />
            </Suspense>
          }
        />
        <Route
          path="auth"
          element={
            <UnAuthorizedRoute>
              <AuthPage />
            </UnAuthorizedRoute>
          }
        />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Route>
    </Routes>
  );
}

export default App;
