//importamos firebase
import firebase from "firebase/app"

//Este es la "key" para comunicarse con firebase, la base de
//datos única creada por el desarrollador
const firebaseConfig = {
    apiKey: "AIzaSyCeq_wBeNXTxBZU85_LV0EPvsu7_LWCS4E",
    authDomain: "birthday-f0fc7.firebaseapp.com",
    databaseURL: "https://birthday-f0fc7.firebaseio.com",
    projectId: "birthday-f0fc7",
    storageBucket: "birthday-f0fc7.appspot.com",
    messagingSenderId: "376975045235",
    appId: "1:376975045235:web:60783881f410988de53006"
  };

//Exportamos y inicializamos firebase
export default firebase.initializeApp(firebaseConfig);