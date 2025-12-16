# --------- Build React App ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Accepts ,env backend URL varibale at build time
ARG VITE_BACKEND_URL
# Makes it available to Vite during build
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build


# --------Serving with Nginx ----------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
