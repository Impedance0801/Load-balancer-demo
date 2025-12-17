import { hash } from "../utils.js";
import { nodeHealth } from "./nodes.js";
import { getSortedHashes } from "./hashRing.js";
import { hashRing } from "./hashRing.js";
import { logRequest } from "./logger.js";
import { isRateLimited } from "./rateLimiter.js";
import { record } from "./metrics.js";


export function routeRequest(ip) {
  if (isRateLimited(ip)) {
    console.log(` Rate limit exceeded for ${ip}`);
    return;
  }

  const hashes = getSortedHashes();
  const index = hash(ip) % hashes.length;

  for (let i = 0; i < hashes.length; i++) {
    const node = hashRing.get(hashes[(index + i) % hashes.length]);
    if (nodeHealth[node]) {
      logRequest(ip, node);
      record(node);
      return node;
    }
  }

  console.log("No healthy nodes available");
}





