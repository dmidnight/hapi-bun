# Use Bun’s official image (supports ARM and x86)
FROM oven/bun:1.1.0

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies first (layer caching)
COPY bun.lock package.json ./
RUN bun install

# Copy the rest of your app code
COPY . .

# Expose a port (adjust if your app uses a different one)
EXPOSE 3000

# Run the app (adjust if you use a different entry point)
CMD ["bun", "run", "start"]