import express from "express";
import { loadRoutes } from "./services/index.js";
import { v1Routes } from "./v1RoutesPath/index.js";
import firebase from "./services/Firebase.js";
import { Pkey } from "./env/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

// load firebase database
const db = firebase?.db;
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


//Load all routes
loadRoutes(v1Routes, (path, route) => app.use(path, route));

//Wrong Route
app.use("/", async (req, res) => {
  res.send("<h1>Ersror 404 Not Found !</h1>");
  res.end();
});

app.listen(PORT);
