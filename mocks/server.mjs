import express from "express";
import morgan from "morgan";

function parseApiUrl() {
  const url = process.env.MOCK_API_URL;
  if (!url) {
    throw new Error("MOCK_API_URL is not set");
  }
  try {
    return new URL(url);
  } catch (error) {
    throw new Error(`invalid MOCK_API_URL=${url}: ${error.message}`);
  }
}

const { hostname, port, protocol } = parseApiUrl();

const app = express();

app.use(morgan("dev")); // http logging

app.use(express.json()); // parse json body

app.get("/health", (req, res) => {
  res.send("ok");
});

const counter = {};

app.get("/count/:keyword", (req, res) => {
  const { keyword } = req.params;
  counter[keyword] = (counter[keyword] ?? 0) + 1;
  res.send(`${keyword} ${counter[keyword]}`);
});

app.listen(port, hostname, () => {
  console.log(`Mock API server running at ${protocol}//${hostname}:${port}`);
});
