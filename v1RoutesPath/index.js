import Users from "../routes/Users.js";
import Spotify from "../routes/Spotify.js";
import Youtube from "../routes/Youtube.js";

export const v1Routes = [
  { path: "/users", file: Users },
  { path: "/spotify", file: Spotify },
  { path: "/youtube", file: Youtube },
];
