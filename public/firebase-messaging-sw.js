importScripts(
  "https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js"
);

const params = new URL(location).searchParams;
const apiKey = params.get("apiKey");
const authDomain = params.get("authDomain");
const projectId = params.get("projectId");
const storageBucket = params.get("storageBucket");
const messagingSenderId = params.get("messagingSenderId");
const appId = params.get("appId");

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};


if (firebaseConfig.apiKey) {
  console.log("firebaseConfig=", firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

 
  messaging.onBackgroundMessage((payload) => {
    console.log("Background Notification:", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}