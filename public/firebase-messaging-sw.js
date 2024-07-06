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

// firebase.initializeApp(firebaseConfig);

// Set Firebase configuration, once available
// addEventListener('load', () => {
//   const urlParams = new URLSearchParams(location.search);
//   self.firebaseConfig = Object.fromEntries(urlParams);
// });

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};
console.log('firebaseConfig=',firebaseConfig);
console.log('self.firebaseConfig=',self.firebaseConfig);
// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// messaging.setBackgroundMessageHandler(function (payload) {

//   console.log('[firebase-messaging-sw.js] Received background message ', payload)

//   const notificationTitle = payload.data.title
//   const notificationOptions = {
//       body: payload.data.body,
//       icon: 'images/notification-logo1.png'
//   }

//   return self.registration.showNotification(notificationTitle, notificationOptions)
// })

// self.addEventListener('notificationclick', (event) => {
//   console.log(event)
//   return event
// })
