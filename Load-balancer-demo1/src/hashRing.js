import { hash } from "../utils.js";
import { nodes } from "./nodes.js";
import { nodeWeights } from "./nodes.js";

const VIRTUAL_NODES = 100;
export const hashRing = new Map();

console.log(nodes, "testng nodes");
console.log(typeof nodes, "testing type");

export function buildHashRing() {
  nodes.forEach((node) => {
    const weight = nodeWeights[node] || 1;
    for (let i = 0; i < VIRTUAL_NODES * weight; i++) {
      hashRing.set(hash(`${node}#${i}`), node);
    }
  });
}

export function getSortedHashes() {
  return Array.from(hashRing.keys()).sort((a, b) => a - b);
}

buildHashRing();
