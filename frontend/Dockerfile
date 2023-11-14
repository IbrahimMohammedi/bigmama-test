# Use the official lightweight Node image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

RUN npm install -g npm@10.2.3

# Install project dependencies
RUN npm install

# Copy the project files and folders to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
