// Configuração FireBase
export const firebaseConfig = {
  apiKey: "AIzaSyCShoaRUFe6sA4zga76Ev02rqhQGD5Pxzk",
  authDomain: "psi-daisy.firebaseapp.com",
  projectId: "psi-daisy",
  storageBucket: "psi-daisy.appspot.com",
  messagingSenderId: "879694397986",
  appId: "1:879694397986:web:4c12f9a0cba864c70b807b",
  measurementId: "G-TE7DB8GN94"
}

// Toaster de mensagens 
export const mostrarToast = (mensagem, cor) => {
  Toastify({
      text: mensagem,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
          background: cor,
      },
      onClick: function(){} 
  }).showToast();
}

export const mascaraTel = (campoTel) => {
  // Máscara de telefone
  campoTel.addEventListener("input", (event) => {
    let input = event.target;
    let telefone = input.value.replace(/\D/g, '');

    if (telefone.length > 10) {
        telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (telefone.length > 5) {
        telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (telefone.length > 2) {
        telefone = telefone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        telefone = telefone.replace(/^(\d*)/, '($1)');
    }
    input.value = telefone;
});
}

export const mascaraData = (campoData) => {
  // Máscara de data
  campoData.addEventListener("input", function (event) {
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
}