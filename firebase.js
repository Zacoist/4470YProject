import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCQgWemcJFPWosyUESorlvUzVG4CTarlK8",
  authDomain: "compostapp-28145.firebaseapp.com",
  databaseURL: "https://compostapp-28145-default-rtdb.firebaseio.com/",
  projectId: "compostapp-28145",
  storageBucket: "gs://compostapp-28145.appspot.com/",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
