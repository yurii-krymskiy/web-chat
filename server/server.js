import express from "express";
import "dotenv/config";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use("/", (req, res) => res.send("Server is live"));

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
}

export default server;
