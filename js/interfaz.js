// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaJFj83VlUOizrZgdkE1nRPmfsLa-U4c0",
  authDomain: "facial-recognition-game-a3b67.firebaseapp.com",
  projectId: "facial-recognition-game-a3b67",
  storageBucket: "facial-recognition-game-a3b67.appspot.com",
  messagingSenderId: "850416641378",
  appId: "1:850416641378:web:f839aed595faca52da383b",
  measurementId: "G-7HSL7H1PSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
document.addEventListener("DOMContentLoaded", function() {
    // Obtén todos los botones
    let button = document.getElementById('start');
    let btn_punct = document.getElementById("punctuations")
    // Agrega un evento de clic a cada botón
    button.addEventListener('click', async function() {
      // Redirige al usuario a index.html
      let name_ = document.getElementById("name").value;
      if(name_){
        try{
          const new_user = await addDoc(collection(firestore, "users"), {
            name: name_
          });
          console.log("Usuario agregado")
          const id =new_user.id
          window.location.href = 'levels/calibration1.html?id_usuario='+id;
        } catch(error){
          console.log("Usuario no agregado")
          console.log(error)
        }
      }else{
        alert("Por favor ingrese su nombre");
      }
    });
    btn_punct.addEventListener('click', function() {
      // Redirige al usuario a index.html
      window.location.href = 'levels/punctuations.html';
    });
  });
  
