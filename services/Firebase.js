import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../env/index.js";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
var app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let firebase={ app, db, storage }

export default firebase;
