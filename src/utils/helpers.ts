export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const upperFirstCharacter = (
  str: string,
  convert: "firstWord" | "allWords"
) => {
  const words = str.split(/\s+/);
  let result = "";
  if (convert === "allWords")
    result = words
      .map(
        (word) =>
          word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  if (convert === "firstWord")
    result = words
      .map((word, index) => {
        if (index > 0) return word.toLowerCase();
        else
          return (
            word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLowerCase()
          );
      })
      .join(" ");
  return result;
};

export const setupServiceWorker = async () => {
  // let scriptURL = "firebase-messaging-sw.js";
  // scriptURL += `?apiKey=${process.env.REACT_APP_API_KEY}`;
  // scriptURL += `&authDomain=${process.env.REACT_APP_AUTH_DOMAIN}`;
  // scriptURL += `&projectId=${process.env.REACT_APP_PROJECT_ID}`;
  // scriptURL += `&storageBucket=${process.env.REACT_APP_STORAGE_BUCKET}`;
  // scriptURL += `&messagingSenderId=${process.env.REACT_APP_MESSAGING_SENDER_ID}`;
  // scriptURL += `&appId=${process.env.REACT_APP_APP_ID}`;
  // scriptURL += `&measurementId=${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`;

  const firebaseConfig = new URLSearchParams({
    apiKey: process.env.REACT_APP_API_KEY ?? "",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ?? "",
    projectId: process.env.REACT_APP_PROJECT_ID ?? "",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET ?? "",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ?? "",
    appId: process.env.REACT_APP_APP_ID ?? "",
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID??""
  }).toString();
  const swUrl = `${process.env.REACT_APP_PUBLIC_URL}/firebase-messaging-sw.js?${firebaseConfig}`;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(swUrl);
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    });
  }
};
