import CustomToolbarProgress from "pages/AppLayout/CustomToolbar";
import React, { Suspense } from "react";
import { LoadingSpinner } from "shared/components";

type SuspensedPageViewProps = { children: React.ReactNode };

export const SuspensedPageView = ({ children }: SuspensedPageViewProps) => {
  return (
    <Suspense
      fallback={
        <>
          <CustomToolbarProgress />
          <LoadingSpinner floatingOver />
        </>
      }
    >
      {children}
    </Suspense>
  );
};
