import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.4/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { firebaseConfig } from 'https://leyuur.github.io/psidaisy/js/config.js';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const user = JSON.parse(localStorage.getItem('user'));
    
document.getElementById("form-h1").innerText = "Olá, " + user.displayName + "! Vamos finalizar seu cadastro";

document.getElementById("btn-finalizar").addEventListener("click", () => {

    // Função para adicionar um novo usuário
    async function adicionarUsuario() {
    try {
        const docRef = await addDoc(collection(db, "usuarios"), {
        data_nasc: document.getElementById("data-nasc").value,
        email: user.email,
        endereco: document.getElementById("endereco").value,
        nome: user.displayName,
        tel: document.getElementById("tel").value
        });
        console.log("Documento adicionado: ", docRef);
        alert("Deu certo!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        Toastify({
            text: "Algo deu errado. Tente novamente",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
            onClick: function(){} // Callback after click
            }).showToast();
    }
    }

    adicionarUsuario();
})

