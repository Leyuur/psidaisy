import { firebaseConfig } from './config.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar/Ocultar senha
    let olho = document.getElementById("olho-icon");
    let senha = document.getElementById("senha");
    olho.addEventListener('click', () => {
        if (olho.innerText == "visibility") {
            olho.innerText = "visibility_off";
            senha.type = "password";
        } else {
            olho.innerText = "visibility";
            senha.type = "text";
        }
    })

    // Login com o google 
    let googleBtn = document.getElementById("google-btn");
    googleBtn.addEventListener('click', () => {

        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Usuário logado:", user);
            })
            .catch((error) => {
                console.error("Erro ao fazer login com o Google:", error);
            });

    })
})

