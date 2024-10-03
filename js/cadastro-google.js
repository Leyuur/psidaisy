document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem('user'));
    document.querySelector("#form-h1").innerText = "Olá, " + user.displayName + "! Vamos finalizar seu cadastro";
})

