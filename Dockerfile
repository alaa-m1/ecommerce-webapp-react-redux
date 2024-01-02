# Stage 1
# Use the desired Node.js runtime as the base image
FROM node:18-alpine AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install

# Copy the entire React app code to the container
COPY . .

# Stage 2
# Build the React app for production
RUN pnpm run build

# Stage 3
# Expose the port of your application to bind with the host port
EXPOSE 3000
 
# run your app
CMD ["pnpm", "run", "start"]
