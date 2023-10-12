import express from "express";
import { getAllDocs, getDocById } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

//get user by id
router.get("/:id", ensureToken, getDocById);

export default router;
