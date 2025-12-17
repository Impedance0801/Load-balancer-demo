import routeRequest from "./src/loadBalancer.js";
import generateRandomIP from "./utils.js";
import showMetrics from "./src/metrics.js";

for (let i = 0; i < 20; i++) {
  routeRequest(generateRandomIP());
}

showMetrics();
