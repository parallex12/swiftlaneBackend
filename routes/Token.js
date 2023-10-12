import express from "express";
import {getSignedToken } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

// generate token by id
router.get("/:id", getSignedToken);

export default router;
