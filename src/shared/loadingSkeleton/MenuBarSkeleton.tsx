import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const MenuBarSkeleton = () => {
  return (
    <div style={{ width: "100%", padding: "0px 20px" }}>
      <Skeleton
        baseColor="#4B40C8"
        highlightColor="#5C50E7"
        style={{ height: "3px", margin: "10px 0px 20px" }}
      />
    </div>
  );
};
