import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { firebaseConfig } from 'https://leyuur.github.io/psidaisy/js/config.js';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const mascaraTelefone = (event) => {
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
    }
    
    document.getElementById("tel").addEventListener("input", () => {
        mascaraTelefone(event)
    })
    
    document.getElementById("btn-cadastrar").addEventListener("click", () => {
    
        // Função para adicionar um novo usuário
        async function adicionarUsuario() {
        try {
            const docRef = await addDoc(collection(db, "usuarios"), {
            data_nasc: document.getElementById("data-nasc").value,
            email: document.getElementById("email").value,
            endereco: document.getElementById("endereco").value,
            nome: document.getElementById("nome").value,
            tel: document.getElementById("tel").value,
            senha: document.getElementById("senha").value
            });
            console.log("Documento adicionado: ", docRef);
            localStorage.setItem("logado", "sim");
    
            Toastify({
                text: "Usuário criado com sucesso!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "green",
                },
                onClick: function(){} // Callback after click
                }).showToast();
            
                setTimeout(() => {
                    window.location.href = "https://leyuur.github.io/psidaisy/index.html";
                }, 3000);
    
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
    
    if (document.getElementById("senha").value != document.getElementById("confirm-senha").value){
        document.getElementById("senha").style.border = "1px solid red";
        document.getElementById("confirm-senha").style.border = "1px solid red";
        document.getElementById("senha").focus();
        Toastify({
            text: "As senhas devem ser iguais",
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
    } else {
        adicionarUsuario();
    }
        
    })
})





