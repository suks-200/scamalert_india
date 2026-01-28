// firebase.js (MODULE SDK)


// IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";


// CONFIG (TUMHARA HI DATA)
const firebaseConfig = {
apiKey: "AIzaSyD0cGqjEITi_sHri4yVFxl8CvX444W05Qk",
authDomain: "scamalert-india.firebaseapp.com",
projectId: "scamalert-india",
storageBucket: "scamalert-india.firebasestorage.app",
messagingSenderId: "938841083402",
appId: "1:938841083402:web:3a2821f91b5109c23359f3"
};


// INIT
const app = initializeApp(firebaseConfig);


// SERVICES EXPORT
export const db = getFirestore(app);
export const storage = getStorage(app);