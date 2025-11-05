import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_fbOr_gaKmUUQAH590W1-Sj1xvpc4RXE",
  authDomain: "decotortas-yamila.firebaseapp.com",
  projectId: "decotortas-yamila",
  storageBucket: "decotortas-yamila.firebasestorage.app",
  messagingSenderId: "716797488981",
  appId: "1:716797488981:web:0af6e4503f61008af949dc"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar autenticación
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;