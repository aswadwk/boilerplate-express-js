# Stage 1: Build dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --production=false

COPY . .

RUN npx prisma generate

# Stage 2: Production image
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production && npm cache clean --force;

COPY --from=builder /app/src ./src

# Hapus file test dan _test agar image lebih kecil
RUN rm -rf ./src/application/_test ./test

CMD ["npm", "run", "start"]