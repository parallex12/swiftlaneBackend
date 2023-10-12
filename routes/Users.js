import express from "express";
import {  getDocById, updateDocById } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

//get user by id
router.get("/:id", ensureToken, getDocById);

//update user by id
router.post("/:id", ensureToken, updateDocById);

export default router;
