# Traffix – Custom Application-Level Load Balancer

Traffix is a custom-built Layer-7 HTTP Load Balancer with an admin dashboard,
designed to manage backend servers dynamically, perform health checks,
and route traffic only to healthy services.

## Table of Contents

1. [Overview](#overview)  
2. [System Architecture](#system-architecture)  
3. [Health Check Mechanism](#health-check-mechanism)  
4. [Prerequisites](#prerequisites)  
5. [Running the Project Locally](#running-the-project-locally)  
6. [Docker Images](#docker-images)  
7. [Environment Configuration](#environment-configuration)  
8. [Common Issues & Troubleshooting](#common-issues--troubleshooting)



## Overview

Traffix is a custom-built application-level (Layer 7) HTTP Load Balancer designed
to dynamically route incoming client requests to healthy backend services.

Unlike traditional static load balancers, Traffix allows backend servers to be
added, removed, and monitored at runtime through an admin dashboard.
The system continuously performs health checks and ensures that traffic is routed
only to available and healthy backends. It also maintains detailed logs of incoming
requests, including request type, request ID, HTTP method, path, selected backend
server, response status, client IP address, and request latency.

The project is built using a microservices architecture and is fully containerized
using Docker, making it easy to run locally or deploy in cloud environments.



## System Architecture

Traffix follows a microservices-based architecture composed of four main components:

1. **Admin Client (Frontend)**
2. **Admin Server (Backend API)**
3. **Load Balancer**
4. **MongoDB (Persistent Storage)**

### High-Level Request Flow

1. The administrator accesses the **Admin Client** (React application) to:
   - Register backend server URLs
   - View backend health status
   - Manage routing configuration

2. The **Admin Client** communicates with the **Admin Server**, which:
   - Stores backend metadata in MongoDB
   - Exposes APIs for backend management
   - Acts as the control plane for the Load Balancer

3. The **Load Balancer**:
   - Periodically fetches the backend list from the Admin Server
   - Performs health checks on each backend
   - Routes incoming client traffic only to healthy backends

4. End users send requests to the **Load Balancer**, which forwards them to one of
   the healthy backend servers based on the load balancing strategy.




## Health Check Mechanism

Backend server health is determined through periodic health checks performed by
the Load Balancer.

The health check workflow is as follows:

1. The Load Balancer periodically fetches the list of registered backend servers
   from the Admin Server.
2. Each backend server is probed using an HTTP-based health check endpoint.
3. If a backend responds successfully within the expected time, it is marked as
   **healthy**.
4. If a backend fails to respond or returns an error, it is marked as
   **unhealthy** and removed from the active routing pool.
5. Incoming client requests are routed only to backends that are currently
   marked as healthy.

If no healthy backend servers are available, the Load Balancer returns a
`503 Service Unavailable` response to the client instead of forwarding traffic.
This prevents cascading failures and protects downstream services.

> Backend servers registered in Traffix must expose a health check endpoint.  
> Each backend service is expected to implement an HTTP endpoint at `/health`
> that returns a successful response (`200 OK`) when the service is healthy.
> The Load Balancer uses this endpoint to determine backend availability and
> routing eligibility.

### Example Backend Health Check Implementation

Below is a minimal example of a backend server implemented using Node.js that
is compatible with Traffix health checks:

```js
// Health check endpoint required by Traffix
function healthCheckHandler(req, res) {
  if (req.url === "/health") {
    res.statusCode = 200;
    return res.end("OK");
  }
}
```


## Prerequisites

To run Traffix locally, ensure the following tools are installed on your system:

- **Docker** (version 20.x or later)
- **Docker Compose** (Compose v2 recommended)

The project is fully containerized, so no local installation of Node.js,
MongoDB, or frontend tooling is required.


## Running the Project Locally

Traffix can be started locally using Docker containers pulled directly from
Docker Hub.

### 1. Clone the Repository

```bash
HTTPS > git clone https://github.com/Sibuchanda/TRAFFIX.git

SSH > git clone git@github.com:Sibuchanda/TRAFFIX.git

cd TRAFFIX
```

## 2. Create a Docker Compose File

Create a `docker-compose.yml` file in the root of the project.

### Example `docker-compose.yml`

```yaml
services:
  mongo:
    image: mongo:7
    container_name: mongo
    volumes:
      - traffix-mongo-data:/data/db
    networks:
      - traffix-network

  adminserver:
    image: sibuchanda/traffix-adminserver:latest
    container_name: adminserver
    depends_on:
      - mongo
    environment:
      MONGO_URI: mongodb://mongo:27017/loadbalancer_admin
      CLIENT_URI: http://localhost:5173
      PORT: 8001
      JWT_SECRET: demo_secret_123
      LB_SECRET_KEY: demo_lb_secret_123
    ports:
      - "8001:8001"
    networks:
      - traffix-network

  adminclient:
    image: sibuchanda/traffix-adminclient:latest
    container_name: adminclient
    depends_on:
      - adminserver
    ports:
      - "5173:80"
    networks:
      - traffix-network

  loadbalancer:
    image: sibuchanda/traffix-loadbalancer:latest
    container_name: loadbalancer
    depends_on:
      - adminserver
    environment:
      LB_PORT: 8080
      ADMIN_SERVER_URL: http://adminserver:8001
      LB_SECRET_KEY: demo_lb_secret_123
    ports:
      - "8080:8080"
    networks:
      - traffix-network

volumes:
  traffix-mongo-data:

networks:
  traffix-network:
    driver: bridge
 bridge
```
> ⚠️ **Note**  
> Ports, volumes, network names, and secret keys can be modified according to user preferences and deployment requirements.


## 3. Run all services
Start all services using Docker Compose:
```
docker compose up -d
```
Once the containers are running, the services will be available at the following endpoints:

#### Admin Client (Dashboard):
Access the Admin Client in your browser to register and manage backend servers -->
http://localhost:5173

Load Balancer:
Access the Load Balancer entry point to verify request routing to backend servers -->
http://localhost:8080

> PORTS depends upon user preferences


## Docker Images

All Traffix services are published as independent Docker images on Docker Hub.
This allows users to pull and run each service without building images locally.

### Available Images

| Service | Docker Image |
|------|-------------|
| Admin Server | `sibuchanda/traffix-adminserver:latest` |
| Admin Client | `sibuchanda/traffix-adminclient:latest` |
| Load Balancer | `sibuchanda/traffix-loadbalancer:latest` |

### Pull Images Manually (Optional)

If you want to pull the images manually, run:

```bash
docker pull sibuchanda/traffix-adminserver:latest
docker pull sibuchanda/traffix-adminclient:latest
docker pull sibuchanda/traffix-loadbalancer:latest
```

## Environment Configuration

Traffix services are configured using environment variables. This allows flexible
configuration across different environments without modifying application code.

Below is a breakdown of environment variables used by each service.


### Admin Server Environment Variables

| Variable | Description |
|--------|------------|
| `MONGO_URI` | MongoDB connection string used to store backend metadata |
| `CLIENT_URI` | Allowed origin for the Admin Client (used for CORS) |
| `PORT` | Port on which the Admin Server listens |
| `JWT_SECRET` | Secret key used for signing authentication tokens |
| `LB_SECRET_KEY` | Shared secret used for secure communication with the Load Balancer |



### Load Balancer Environment Variables

| Variable | Description |
|--------|------------|
| `LB_PORT` | Port on which the Load Balancer listens |
| `ADMIN_SERVER_URL` | URL of the Admin Server used to fetch backend configuration |
| `LB_SECRET_KEY` | Shared secret key to authenticate requests to the Admin Server |



### Admin Client Environment Variables

The Admin Client is a frontend application built with Vite.  
Its configuration is injected at **build time**.

| Variable | Description |
|--------|------------|
| `VITE_BACKEND_URL` | Base URL of the Admin Server API |

> ⚠️ **Note**  
> Changes to `VITE_BACKEND_URL` require rebuilding the Admin Client image,
> as Vite embeds environment variables during the build process.



## Common Issues & Troubleshooting

### 1. Service Unavailable: No Healthy Backend on Startup

**Explanation:**
On startup, the Load Balancer may not yet have fetched the backend list from the
Admin Server. During this initial synchronization window, no backend is marked
as healthy.

**Solution:**
Wait for the initial backend fetch to complete, or ensure the Load Balancer performs
an initial backend synchronization during startup before accepting traffic.

