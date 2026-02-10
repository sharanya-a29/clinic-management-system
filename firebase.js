const firebaseConfig = {
  apiKey: "AIzaSyBFMaAb7gzyuYs7dKwqpd54O1XuOLOhUco",
  authDomain: "clinicmanagementsystem-1febb.firebaseapp.com",
  projectId: "clinicmanagementsystem-1febb",
  storageBucket: "clinicmanagementsystem-1febb.firebasestorage.app",
  messagingSenderId: "118384242620",
  appId: "1:118384242620:web:f2eda61853b3db7f1c05b9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

function sysLog(action, details) {
    db.collection('system_logs').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        action: action,
        details: details
    }).catch(err => console.error("Log Error:", err));
}
console.log("Clinic System Connected!");