import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { firebaseConfig, mostrarToast, mascaraData, mascaraTel } from 'https://leyuur.github.io/psidaisy/js/config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


document.addEventListener("DOMContentLoaded", () => {
    // Máscara de data
    mascaraData(document.getElementById("data-nasc"));

    // Máscara de telefone
    mascaraTel(document.getElementById("tel"));

    // Evento para o botão cadastrar
    document.getElementById("btn-cadastrar").addEventListener("click", (event) => {
        let data_nasc = document.getElementById("data-nasc").value;
        let email = document.getElementById("email").value;
        let endereco = document.getElementById("endereco").value;
        let nome = document.getElementById("nome").value;
        let tel = document.getElementById("tel").value;
        let senha = document.getElementById("senha").value;
        let confirm_senha = document.getElementById("confirm-senha").value;

        if (data_nasc === "" || email === "" || endereco === "" || nome === "" || tel === "" || senha === "" || confirm_senha === "") {
            mostrarToast("Todos os campos devem ser preenchidos", "red");
            return;
        } else if (senha.trim() !== confirm_senha.trim()) {
            document.getElementById("senha").style.border = "1px solid red";
            document.getElementById("confirm-senha").style.border = "1px solid red";
            document.getElementById("senha").focus();
            mostrarToast("As senhas devem ser iguais", "red");
            return;
        } else if (senha.trim().length < 6) {
            document.getElementById("senha").style.border = "1px solid red";
            document.getElementById("senha").focus();
            mostrarToast("A senha deve conter pelo menos 6 caracteres", "red");
            
        } else {
            verificarEmail(email, data_nasc, endereco, nome, tel, senha);
            document.getElementById("btn-cadastrar").disabled = true;
        }
    });
});

// Verifica se o e-mail já está cadastrado
async function verificarEmail(email, data_nasc, endereco, nome, tel, senha) {
    const q = query(collection(db, "usuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        document.getElementById("email").style.border = "1px solid red";
        document.getElementById("email").focus();
        mostrarToast("E-mail já cadastrado. Tente outro", "red");
        return false;
    } else {
        adicionarUsuario(data_nasc, email, endereco, nome, tel, senha);
    }
}

// Adiciona o usuário ao Firebase Authentication e ao Firestore
async function adicionarUsuario(data_nasc, email, endereco, nome, tel, senha) {
    try {
        // Primeiro cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        console.log("Usuário cadastrado:", user);

        // Depois, adiciona os dados extras ao Firestore
        await addDoc(collection(db, "usuarios"), {
            data_nasc: data_nasc,
            email: email,
            endereco: endereco,
            nome: nome,
            tel: tel
        });

        localStorage.setItem("logado", "sim");
        mostrarToast("Usuário criado com sucesso!", "green");
        document.getElementById("btn-cadastrar").disabled = false;
        // Redireciona o usuário após o cadastro
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 2000);
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        mostrarToast("Algo deu errado. Tente novamente", "red");
    }
}
