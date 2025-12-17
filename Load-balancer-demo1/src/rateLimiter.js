const store = {};
const LIMIT = 5;
const WINDOW = 60000;

export function isRateLimited(ip) {
  const now = Date.now();

  if (!store[ip]) {
    store[ip] = { count: 1, start: now };
    return false;
  }

  if (now - store[ip].start > WINDOW) {
    store[ip] = { count: 1, start: now };
    return false;
  }

  store[ip].count++;
  return store[ip].count > LIMIT;
}


