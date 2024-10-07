import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { firebaseConfig, mostrarToast } from 'https://leyuur.github.io/psidaisy/js/config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    let emailInput = document.getElementById("email");
    let btnEnviar = document.getElementById("btn-enviar");
    let loading = document.getElementById("loading");
    let h3 = document.getElementById("loading-h3");

    btnEnviar.addEventListener("click", () => {
        let email = emailInput.value;
        loading.style.display = "flex";

        async function queryEmail(email) {
            try {
                const q = query(collection(db, "usuarios"), where("email", "==", email));
                const result = await getDocs(q);
            
                if (!result.empty) {
                    // Usuário encontrado, enviar e-mail de redefinição
                    sendPasswordResetEmail(auth, email)
                    .then(() => {
                        console.log('E-mail de redefinição de senha enviado.');
                        mostrarToast("E-mail de redefinição de senha enviado para " + email, "green");
                        h3.innerHTML = "Redirecionando...";

                        setTimeout(() => {
                            window.location.href = "./index.html"
                        }, 3000);
                    })
                    .catch((error) => {
                        // Erro ao enviar o e-mail
                        loading.style.display = "none";
                        mostrarToast("Algo deu errado. Tente novamente", "red");
                        console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
                    });
                } else {
                    // E-mail não encontrado no Firestore
                    mostrarToast("Usuário não existe", "red");
                    loading.style.display = "none";
                }
            } catch (error) {
                // Erro ao consultar o Firestore
                loading.style.display = "none"; 
                mostrarToast("Erro ao verificar usuário. Tente novamente", "red");
                console.error('Erro ao consultar o Firestore:', error);
            }
        }

        queryEmail(email); 
    });
});
