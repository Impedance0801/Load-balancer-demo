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
* Simple metrics dashboard
* Rate limiting per IP
* Optional Express API for demo via Postman

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

### 2️⃣ Install Dependencies

```bash
npm install express
```

(Express is required only for API usage.)

---



---

##  Run as REST API (Optional)

### Start Server

```bash
node server.js
```

Server will run at:

```
http://localhost:3000
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

### Test Rate Limiting

Send the same IP more than 5 times quickly:

```text
 Rate limit exceeded
```

### Simulate Node Failure

In `src/nodes.js`:

```js
nodeHealth["Node-B"] = false;
```

Node-B will stop receiving traffic.


