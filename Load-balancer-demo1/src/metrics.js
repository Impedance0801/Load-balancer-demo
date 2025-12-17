export const metrics = {
  total: 0,
  perNode: {
    "Node-A": 0,
    "Node-B": 0,
    "Node-C": 0,
  },
};

export function record(node) {
  metrics.total++;
  metrics.perNode[node]++;
}

export function showMetrics() {
  return metrics;
}


