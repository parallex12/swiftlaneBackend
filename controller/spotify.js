import SpotifyWebApi from "spotify-web-api-node";
import { redirect_uri_pro } from "../env/index.js";

var spotifyApi = new SpotifyWebApi({
  clientId: "ff53ed3aa96b4ea99ba922d1883aea19",
  clientSecret: "df79bec38e2c4742bd662c226b67aea9",
  redirectUri: "com.adlerwareco.swiftlane://",
});
// spotifyApi.setAccessToken('<your_access_token>');

export const getToken = async (req, res) => {
  try {
    // var state = generateRandomString(16);
    var scopes = ["user-read-private", "user-read-email"];
    let url = spotifyApi.createAuthorizeURL(scopes);
    console.log(url);
    res.send(url);
    res.end();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};

export const refreshToken = async (req, res) => {
  try {
    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        spotifyApi.setAccessToken(data.body["access_token"]);
      })
      .catch((e) => {
        console.log(e.message);
        res.sendStatus(500);
      });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};
export const callBackToken = async (req, res) => {
  try {
    const code = req.query.code;
    console.log(code);
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        spotifyApi.setAccessToken(data.body["access_token"]);
        spotifyApi.setRefreshToken(data.body["refresh_token"]);
        res.send({
          access_token: data.body["access_token"],
          refresh_token: data.body["refresh_token"],
        });
        res.end();
      })
      .catch((e) => {
        console.log(e.message);
        res.sendStatus(500);
      });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};
