import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import firebase from "../services/Firebase.js";

let app = firebase?.app;
let db = firebase?.db;
let storage = firebase?.storage;

export const Query = {
  query_Get_all: async (path) => await getDocs(collection(db, path)),
  query_Get_by_id: async (path, id) => await getDoc(doc(db, path, id)),
};
