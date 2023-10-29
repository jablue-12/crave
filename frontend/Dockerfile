# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application files
COPY . .

# Build the React application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the React app
CMD [ "npm", "start" ]
