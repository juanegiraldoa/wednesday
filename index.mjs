import env from "dotenv";
import { postWednesday } from "./src/itswednesday.mjs";

env.config();

export const handler = async (event) => {
  return { statusCode: 200, body: postWednesday() };
};
