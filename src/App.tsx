import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/Home/HomePage";
import ClassicCollectionPage from "pages/ClassicCollection/ClassicCollectionPage";
import AuthPage from "pages/Auth/AuthPage";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import AppLayout from "pages/AppLayout/AppLayout";
import { CategoriesListSkeleton, linksDetails } from "shared";
import Checkout from "pages/Checkout/CheckoutPage";
import ModernCollectionPage from "pages/ModernCollection/ModernCollectionPage";
import ProtectedRoute from "utils/routes/ProtectedRoute";
import UserDashboardPage from "pages/UserDashboard/UserDashboardPage";
import UnAuthorizedRoute from "utils/routes/UnAuthorizedRoute";
import TermsPage from "pages/Terms/TermsPage";
import { mapLinks } from "utils/mappingFunctions/mapLinks";
import AboutPage from "pages/About/AboutPage";
import { setupNotifications } from "utils/firebase";
import { setupServiceWorker } from "utils/helpers";

const App = () => {
  
  useEffect(() => {
    setupServiceWorker();
    setupNotifications();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AppLayout links={mapLinks(linksDetails)} />}>
        <Route index element={<HomePage />} />
        <Route path="classic-collection" element={<ClassicCollectionPage />} />
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
        <Route path="about" element={<AboutPage />} />
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
};

export default App;
