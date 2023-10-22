import { Suspense } from "react";
import { LoadingSpinner } from "shared";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { ReactQueryProvider } from "./reactQuery/ReactQueryProvider";
import { stripeOptions, stripePromise } from "utils/stripe/stripe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemedApp from "ThemedApp";

const AppRoot = ({ children }: AppRootType) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ReactQueryProvider>
            <Elements stripe={stripePromise} options={stripeOptions}>
              <Suspense fallback={<LoadingSpinner />}>
                <ThemedApp>{children}</ThemedApp>
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
              </Suspense>
            </Elements>
          </ReactQueryProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

type AppRootType = { children: React.ReactNode };

export default AppRoot;
