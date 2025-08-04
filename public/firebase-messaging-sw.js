/* eslint-disable no-undef */
// Give access to firebase messaging in the service worker
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyCHTDVWe4RLPTRcLbwAZIaBZR8BrpnOlJ0",
  authDomain: "medlink-jobs.firebaseapp.com",
  projectId: "medlink-jobs",
  storageBucket: "medlink-jobs.appspot.com",
  messagingSenderId: "35152628598",
  appId:"1:35152628598:web:27a0e5f426650e0a0a0857",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png", // Add your app icon here
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
