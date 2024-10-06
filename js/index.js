import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { firebaseConfig, mostrarToast } from 'https://leyuur.github.io/psidaisy/js/config.js';


const app = initializeApp(firebaseConfig);
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
    document.getElementById("btn-entrar").addEventListener("click", function(event) {
        event.preventDefault();
    
        let userEmail = document.getElementById("email").value;
        let userSenha = document.getElementById("senha").value;
    

        signInWithEmailAndPassword(auth, userEmail, userSenha)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuário logado:", user);

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem("logado", "sim");

                // if(userEmail === localStorage.getItem("adm")) window.location.href = "https://leyuur.github.io/psidaisy/menu-adm.html";
                // else window.location.href = "https://leyuur.github.io/psidaisy/menu-principal.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error("Erro ao fazer login:", errorMessage);
                mostrarToast("Email ou senha inválida", "red")   
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

                localStorage.setItem('user', JSON.stringify(user));

                if(user.email === localStorage.getItem("adm")) {
                    window.location.href = "https://leyuur.github.io/psidaisy/menu-adm.html";
                    localStorage.setItem("logado", "sim");
                }
                else window.location.href = "https://leyuur.github.io/psidaisy/cadastro-google.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error("Erro ao fazer login:", errorMessage);
                mostrarToast("Algo deu errado. Tente novamente", "red")
            });

    })
})


// JSON.parse(localStorage.getItem('user')) 