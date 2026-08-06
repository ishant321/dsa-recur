# ---------- Build Stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first (Docker cache optimization)
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]