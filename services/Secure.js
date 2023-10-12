import jsonwebtoken from "jsonwebtoken";
import { Pkey } from "../env/index.js";

export const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    let t = jsonwebtoken.verify(bearerToken, Pkey);
    if (req.params.id == t?.id) {
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
