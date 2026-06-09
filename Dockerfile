# Use a slim Node.js LTS image
FROM node:20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of your application code
COPY . .

# Expose the Express port
EXPOSE 3000

# Start the application
CMD [ "node", "server.js" ]