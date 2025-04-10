import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: reemplaza con tus credenciales reales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2Px5FWbA96KhL09YQcQDG-R758W5KnDI",
  authDomain: "clinicahall-142d0.firebaseapp.com",
  projectId: "clinicahall-142d0",
  storageBucket: "clinicahall-142d0.firebasestorage.app",
  messagingSenderId: "588094242731",
  appId: "1:588094242731:web:76cf7e298e9fbb28e1dcee",
  measurementId: "G-9XG3DHY2MK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
