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