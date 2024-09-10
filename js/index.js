import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { firebaseConfig } from ' https://leyuur.github.io/psidaisy/js/config.js ';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
                alert("Oi, " + user.displayName)
            })
            .catch((error) => {
                console.error("Erro ao fazer login com o Google:", error);
            });

    })
})

