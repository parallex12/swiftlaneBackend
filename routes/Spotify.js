import express from "express";
import { ensureToken } from "../services/Secure.js";
import { callBackToken, getToken } from "../controller/spotify.js";

const router = express.Router();

//get spotify token

router.get("/", getToken);
router.get("/accessToken", callBackToken);

export default router;
