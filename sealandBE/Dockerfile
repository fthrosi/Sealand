FROM node:18-alpine

WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/ \
 && npm config set fetch-retries 5 \
 && npm config set fetch-retry-factor 2 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000

COPY package*.json ./
COPY /prisma .
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

# CMD ["node", "dist/server.js"]
CMD ["node", "dist/server.js"]

