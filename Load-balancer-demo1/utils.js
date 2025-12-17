export function generateRandomIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(
    "."
  );
}

export function hash(value) {
  let h = 0;
  for (let char of value) {
    h = (h * 31 + char.charCodeAt(0)) >>> 0;
  }
  return h;
}
