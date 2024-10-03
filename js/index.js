import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { firebaseConfig } from 'https://leyuur.github.io/psidaisy/js/config.js';


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

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

        
    // Login padrão (email/senha) 
    document.querySelector(".form-login").addEventListener("submit", function(event) {
        event.preventDefault();
    
        let userEmail = document.getElementById("email").value;
        let userSenha = document.getElementById("senha").value;
    

        signInWithEmailAndPassword(userEmail, userSenha)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuário logado:", user);
                alert("Bem-vindo, " + user.userEmail);
                // window.location.href = "./menu-principal.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error("Erro ao fazer login:", errorMessage);
            });
    });


    // Login com o google 
    let googleBtn = document.getElementById("google-btn");
    googleBtn.addEventListener('click', () => {
        
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

