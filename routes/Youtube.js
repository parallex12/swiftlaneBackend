import express from "express";
import { ensureToken } from "../services/Secure.js";
import { addChannel } from "../controller/youtube.js";

const router = express.Router();

//get spotify token

// router.get("/", getToken);
// router.get("/accessToken", callBackToken);

router.post("/channel", addChannel);

export default router;
