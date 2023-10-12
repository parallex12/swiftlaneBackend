import Users from "../routes/Users.js";
import Token from "../routes/Token.js";

export const v1Routes = [
  { path: "/users", file: Users },
  { path: "/auth_t", file: Token },
];
