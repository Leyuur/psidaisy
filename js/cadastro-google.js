import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

const user = JSON.parse(localStorage.getItem('user'));
    
document.getElementById("form-h1").innerText = "Olá, " + user.displayName + "! Vamos finalizar seu cadastro";

document.getElementById("btn-finalizar").addEventListener("click", (e) => {
    e.preventDefault();

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

