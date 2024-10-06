import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { firebaseConfig, mostrarToast} from 'https://leyuur.github.io/psidaisy/js/config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
     // Máscara de data
     document.getElementById("data-nasc").addEventListener("input", function (event) {
        let input = event.target.value.replace(/\D/g, '');
        let formatado = '';

        if (input.length > 2) {
            formatado += input.substring(0, 2) + '/';
            input = input.substring(2);
        }
        if (input.length > 2) {
            formatado += input.substring(0, 2) + '/'; 
            input = input.substring(2);
        }
        formatado += input;

        event.target.value = formatado;
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function verificarUser(email) {
        try {
            const q = query(collection(db, "usuarios"), where("email", "==", email));
            const result = await getDocs(q);
        
            if (!result.empty) {
                if(email === localStorage.getItem("adm")) {
                    console.log("é adm")
                    // window.location.href = "https://leyuur.github.io/psidaisy/menu-adm.html";
                }
                else {
                    console.log("não é adm mas tem login") 
                    // window.location.href = "https://leyuur.github.io/psidaisy/menu-principal.html";
                } 
            } else {
                console.log("Usuário ainda não cadastrado")
            }
        } catch (error) {
            console.error("Erro ao verificar usuário:", error);
        }
    }
    console.log(user.email);
    verificarUser(user.email);

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
            localStorage.setItem("logado", "sim");

            window.location.href = "https://leyuur.github.io/psidaisy/menu-principal.html";
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            mostrarToast("Algo deu errado. Tente novamente","red")
        }
        }
        adicionarUsuario();
    })

})

