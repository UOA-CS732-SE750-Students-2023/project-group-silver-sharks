import { createClient } from "@redis/client";
import { promisify } from "util";

const redisClient = createClient({
  host: "127.0.0.1",
  port: 6379,
});

redisClient
  .connect()
  .catch((error) => console.error(`Redis client not connected: ${error}`));

export default redisClient;
