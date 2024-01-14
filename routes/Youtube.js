import express from "express";
import { ensureToken } from "../services/Secure.js";
import {
  addChannel,
  getLatestVideosOfChannel,
  getTopVideosOfChannel,
  getVideoDetails,
} from "../controller/youtube.js";

const router = express.Router();

//get spotify token

// router.get("/", getToken);
// router.get("/accessToken", callBackToken);

router.post("/channel", addChannel);
router.get("/channel/topVideos/:id", getTopVideosOfChannel);
router.get("/video/:id", getVideoDetails);
router.get("/channel/latestVideos/:id", getLatestVideosOfChannel);

export default router;
