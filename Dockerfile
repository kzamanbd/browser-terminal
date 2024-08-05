FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN npm run server:build
EXPOSE 3000
CMD ["node", "server/build/server.js"]
