# Dockerfile
FROM node:7.5.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Install client dependencies
WORKDIR /usr/src/app/client
RUN rm -rf node_modules
RUN npm install

# Build and optimize react app
RUN npm run build

WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 3001

# defined in package.json
CMD [ "npm", "run", "start" ]