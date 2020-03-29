# Extending image
FROM node:carbon-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Port to listener
EXPOSE 8182

# Environment variables
ENV PRODUCTION_PORT 8182
ENV NODE_ENV production
ENV PUBLIC_PATH "/"

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Bundle app source and build it
COPY . .
RUN npm run build

# Main command
CMD [ "npm", "run", "serve" ]
