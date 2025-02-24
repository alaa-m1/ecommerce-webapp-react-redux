import React, { useEffect } from "react";
import { firebaseApp, setupNotifications } from "utils/firebase";
import { setupServiceWorker } from "utils/helpers";
import { getMessaging, onMessage } from "firebase/messaging";
import AppRoutes from "routes";

const App = () => {
  
  useEffect(() => {
    setupServiceWorker();
    setupNotifications();
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      console.log("Message received =", payload);
    });
  }, []);

  return <AppRoutes />;
};

export default App;
