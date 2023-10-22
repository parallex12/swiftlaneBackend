import Users from "../routes/Users.js";
import Spotify from "../routes/Spotify.js";
import Token from "../routes/Token.js";

export const v1Routes = [
  { path: "/users", file: Users },
  { path: "/spotify", file: Spotify },
  { path: "/auth_t", file: Token },
];
