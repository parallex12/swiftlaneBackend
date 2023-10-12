import firebase from "../services/Firebase.js";
import { Query } from "../models/index.js";
import { PrivateKey, SortTableData } from "../services/index.js";
import { Pkey } from "../env/index.js";
import jsonwebtoken from "jsonwebtoken";

export const getAllDocs = async (req, res, table) => {
  try {
    let path = req.originalUrl?.replace("/", "");
    const queryData = SortTableData(await Query?.query_Get_all(path));
    res.send(queryData);
    res.end();
  } catch (e) {
    console.log(e.message);
  }
};

export const getDocById = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = req.params?.id;
    const queryData = await Query?.query_Get_by_id(path[0], id);
    if (queryData.exists()) {
      res.send(queryData?.data());
    } else {
      res.send({ msg: "No user Found", code: "404" });
    }
    res.end();
  } catch (e) {
    console.log(e.message);
  }
};

export const getSignedToken = async (req, res) => {
  try {
    let id = req.params?.id;
    var token = jsonwebtoken.sign({ id: id }, Pkey);
    res.send({ token: token });
    res.end();
  } catch (e) {
    console.log(e.message);
  }
};
