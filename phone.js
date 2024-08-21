import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3D9xQXrhMByLjSQZx8S4_6TZLdA69Mbc",
  authDomain: "sign-in-426ac.firebaseapp.com",
  projectId: "sign-in-426ac",
  storageBucket: "sign-in-426ac.appspot.com",
  messagingSenderId: "559530539359",
  appId: "1:559530539359:web:e2edbf444dc2d3ec2b1eea"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener una referencia a la autenticación de Firebase
const auth = firebase.auth();

// Crear el reCAPTCHA verifier
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

// Manejar el envío del número de teléfono
document.getElementById('phoneAuthForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const phoneNumber = document.getElementById('phoneNumber').value;
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      document.getElementById('phoneAuthContainer').style.display = 'none';
      document.getElementById('verificationCodeContainer').style.display = 'block';
    })
    .catch((error) => {
      console.error('Error en el envío del SMS:', error);
    });
});

// Manejar la verificación del código
document.getElementById('verificationCodeForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const code = document.getElementById('verificationCode').value;
  window.confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      console.log('Usuario iniciado sesión:', user);
    })
    .catch((error) => {
      console.error('Error en la verificación del código:', error);
    });
});
