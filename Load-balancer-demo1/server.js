import express, { json } from "express";
import { routeRequest } from "./src/loadBalancer.js";
import { showMetrics } from "./src/metrics.js";

const app = express();
const PORT = 3000;

app.use(json());

// -------------------- API 1: Route Request --------------------
app.post("/route", (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({
      error: "IP address is required",
    });
  }

  const node = routeRequest(ip);

  if (!node) {
    return res.status(503).json({
      message: "Request blocked or no healthy nodes",
    });
  }

  res.json({
    ip,
    routedTo: node,
  });
});

// -------------------- API 2: Metrics --------------------
app.get("/metrics", (req, res) => {
  res.json(showMetrics());
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(` Load Balancer API running on http://localhost:${PORT}`);
});
