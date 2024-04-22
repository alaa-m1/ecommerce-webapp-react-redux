import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create rtl cache
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

type RtlProps = {
  children: React.ReactNode;
  docDirection: "ltr" | "rtl";
};
const Rtl = ({ docDirection, children }: RtlProps) => {
  return (
    <CacheProvider value={docDirection === "ltr" ? ltrCache : rtlCache}>
      {children}
    </CacheProvider>
  );
};

export default Rtl;
