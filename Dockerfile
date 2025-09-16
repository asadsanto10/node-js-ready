# Stage 1: Build the TypeScript code
FROM node:18 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (better caching)
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy source code
COPY src ./src

# Build the app
RUN npm run build

# Stage 2: Create lightweight production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only package.json and built files
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm install

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "dist/app.js"]
