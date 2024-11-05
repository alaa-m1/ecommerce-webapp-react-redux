import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "pages/Auth/AuthPage";
import AppLayout from "pages/AppLayout/AppLayout";
import { CategoriesListSkeleton, linksDetails } from "shared";
import ProtectedRoute from "utils/routes/ProtectedRoute";
import UserDashboardPage from "pages/UserDashboard/UserDashboardPage";
import UnAuthorizedRoute from "utils/routes/UnAuthorizedRoute";
import TermsPage from "pages/Terms/TermsPage";
import { mapLinks } from "utils/mappingFunctions/mapLinks";
import { SuspensedPageView } from "utils/routes/SuspensedPageView";
import NotFoundPage from "pages/NotFound/NotFoundPage";

const HomePage = lazy(() => import("pages/Home/HomePage"));
const ClassicCollectionPage = lazy(
  () => import("pages/ClassicCollection/ClassicCollectionPage")
);
const ModernCollectionPage = lazy(
  () => import("pages/ModernCollection/ModernCollectionPage")
);
const AboutPage = lazy(() => import("pages/About/AboutPage"));
const CheckoutPage = lazy(() => import("pages/Checkout/CheckoutPage"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout links={mapLinks(linksDetails)} />}>
        <Route
          index
          element={
            <SuspensedPageView>
              <HomePage />
            </SuspensedPageView>
          }
        />
        <Route
          path="classic-collection"
          element={
            <SuspensedPageView>
              <ClassicCollectionPage />
            </SuspensedPageView>
          }
        />
        <Route
          path="modern-collection"
          element={
            <Suspense fallback={<CategoriesListSkeleton />}>
              <SuspensedPageView>
                <ModernCollectionPage />
              </SuspensedPageView>
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
        <Route
          path="checkout"
          element={
            <SuspensedPageView>
              <CheckoutPage />
            </SuspensedPageView>
          }
        />
        <Route
          path="about"
          element={
            <SuspensedPageView>
              <AboutPage />
            </SuspensedPageView>
          }
        />
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

export default AppRoutes;
