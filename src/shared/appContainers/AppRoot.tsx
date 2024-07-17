import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { stripeOptions, stripePromise } from "utils/stripe/stripe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemedApp from "shared/appContainers/components/ThemedApp";
import { ReactQueryProvider } from "./components/reactQuery/ReactQueryProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HelmetProvider } from "react-helmet-async";
import { PrimeReactProvider } from "primereact/api";
import { ReactQueryErrorProvider } from "./components/reactQuery/ReactQueryErrorProvider";

const AppRoot = ({ children }: AppRootType) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ReactQueryProvider>
            <ReactQueryErrorProvider>
              <Elements stripe={stripePromise} options={stripeOptions}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <HelmetProvider>
                    <ThemedApp>
                      <PrimeReactProvider>{children}</PrimeReactProvider>
                    </ThemedApp>
                  </HelmetProvider>
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
                </LocalizationProvider>
              </Elements>
            </ReactQueryErrorProvider>
          </ReactQueryProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

type AppRootType = { children: React.ReactNode };

export default AppRoot;
