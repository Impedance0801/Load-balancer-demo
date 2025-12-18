# IP-Based Load Balancer (Deterministic Routing)

A **beginner-friendly backend project** that implements a **deterministic load balancer** using **consistent hashing with virtual nodes**. The same IP address is always routed to the same backend node, even when nodes are added or removed. The project includes **logging, health checks, weighted routing, metrics, rate limiting**, and an **optional REST API**.

---

## ✨ Key Highlights

* Deterministic routing (no random selection)
* Same IP → same node (session stickiness)
* Consistent hashing with virtual nodes
* Health-aware routing with fallback
* Weighted routing (prioritize stronger nodes)
* Request logging
* Rate limiting per IP
* Optional Express API for demo via Postman
* **Nodemon for auto-reload during development**

---

## 🧠 Algorithm Used

### Consistent Hashing with Virtual Nodes

**Routing flow:**

```
Incoming IP
   ↓
Hash(IP)
   ↓
Map to a virtual node on the hash ring
   ↓
Resolve to a real backend node
```

**Why this works:**

* Same IP always produces the same hash
* Virtual nodes ensure even load distribution
* Adding/removing nodes causes minimal remapping
* Widely used in real systems (NGINX, AWS-style routing)

---

## 📁 Project Structure

```
load-balancer-demo/
│
├── src/
│   ├── loadBalancer.js      # Core routing logic
│   ├── nodes.js             # Node list, health & weights
│   ├── hashRing.js          # Consistent hashing ring
│   ├── logger.js            # Request logging
│   ├── rateLimiter.js       # Rate limiting logic
│   └── metrics.js           # Request metrics
│
├── utils.js                 # IP generator & hash function
├── index.js                 # CLI traffic simulation
├── server.js                # Express API (optional)
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

* Node.js (LTS recommended)

Verify installation:

```bash
node -v
npm -v
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

This installs:

* `express` (for REST API)
* `nodemon` (for development auto-reload)

> Nodemon is added as a **dev dependency**.

---

## ▶️ Running the Project

### 🔹 Run with Nodemon (Recommended for Development)

```bash
npx nodemon server.js
```

OR using npm scripts (recommended):

```bash
npm run dev
```

---

### 🔹 Run Normally (Without Nodemon)

```bash
node server.js
```

---

## 📦 package.json (Relevant Scripts)

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 🌐 Server Details

When running, the server starts at:

```
http://localhost:3000
```

---

## 🧪 Postman Collection (API Demo)

You can test all API endpoints using the shared **Postman collection**:

🔗 **Postman Collection Link**
[https://impedance-5154775.postman.co/workspace/Impedance's-Workspace~0dd529df-c687-4830-88d0-6d32b88c6c52/collection/46353239-771646eb-dfb5-47bc-9bb7-be6751d18e41?action=share&creator=46353239](https://impedance-5154775.postman.co/workspace/Impedance's-Workspace~0dd529df-c687-4830-88d0-6d32b88c6c52/collection/46353239-771646eb-dfb5-47bc-9bb7-be6751d18e41?action=share&creator=46353239)

### How to Use

1. Open the link in a browser
2. Click **Import** in Postman
3. Start the server:

   ```bash
   npm run dev
   ```

---

## 🔌 API Endpoints

### 1️⃣ Route a Request

**POST** `/route`

**Request Body (JSON):**

```json
{
  "ip": "192.168.1.1"
}
```

**Response:**

```json
{
  "ip": "192.168.1.1",
  "routedTo": "Node-A"
}
```

> Sending the same IP again will always return the same node.

---

### 2️⃣ View Metrics

**GET** `/metrics`

**Response:**

```json
{
  "total": 20,
  "perNode": {
    "Node-A": 11,
    "Node-B": 1,
    "Node-C": 8
  }
}
```

---

## 🧪 Testing Tips

### Test Stickiness

Send the same IP multiple times:

```json
{ "ip": "8.8.8.8" }
```

---

### Test Rate Limiting

Send the same IP more than 5 times quickly:

```text
Rate limit exceeded
```

---

### Simulate Node Failure

In `src/nodes.js`:

```js
nodeHealth["Node-B"] = false;
```

Node-B will stop receiving traffic.

---

## ✅ Why Nodemon?

* Automatically restarts the server on file changes
* Faster development cycle
* No need to stop/start the server manually

---

🚀 **This setup now supports both production (`node`) and development (`nodemon`) workflows.**
