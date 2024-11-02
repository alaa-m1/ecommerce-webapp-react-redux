import React, { Suspense } from "react";
import { LoadingSpinner } from "shared/components";
import CustomToolbarProgress from "shared/components/Layout/CustomToolbar";

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
