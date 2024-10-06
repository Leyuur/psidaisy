import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { firebaseConfig, mostrarToast } from 'https://leyuur.github.io/psidaisy/js/config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Criptografar senha 
async function hashSenha(senha) {
    const encoder = new TextEncoder();
    const data = encoder.encode(senha);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Mascara de data 
document.addEventListener("DOMContentLoaded", () => {
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

    // Mascara de telefone 
    document.getElementById("tel").addEventListener("input", (event) => {
        let input = event.target;
        let telefone = input.value.replace(/\D/g, '');
    
        if (telefone.length > 10) {
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (telefone.length > 5) {
            telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (telefone.length > 2) {
            telefone = telefone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            telefone = telefone.replace(/^(\d*)/, '($1');
        }
    
        input.value = telefone;
    });
    
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
            return false;
        } else if (senha.trim() !== confirm_senha.trim()) {
            document.getElementById("senha").style.border = "1px solid red";
            document.getElementById("confirm-senha").style.border = "1px solid red";
            document.getElementById("senha").focus();
            mostrarToast("As senhas devem ser iguais", "red");
            return false;
        } else {
            verificarEmail(email, data_nasc, endereco, nome, tel, senha);
            document.getElementById("btn-cadastrar").disabled = true;
        }
    });
});

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

async function adicionarUsuario(data_nasc, email, endereco, nome, tel, senha) {
    try {
        const senhaCrypto= await hashSenha(senha)
        const docRef = await addDoc(collection(db, "usuarios"), {
            data_nasc: data_nasc,
            email: email,
            endereco: endereco,
            nome: nome,
            tel: tel,
            senha: senhaCrypto
        });
        console.log("Documento adicionado: ", docRef);
        localStorage.setItem("logado", "sim");

        mostrarToast("Usuário criado com sucesso!", "green");
        
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 2000);
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        mostrarToast("Algo deu errado. Tente novamente", "red");
    }
}
