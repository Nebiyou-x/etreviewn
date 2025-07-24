# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Install dependencies for node-gyp and Prisma
RUN apk add --no-cache python3 make g++ openssl

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# Copy Prisma files
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate


COPY . .


RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app


RUN apk add --no-cache openssl


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js


ENV NODE_ENV production
ENV DATABASE_URL postgres://postgres:postgres@postgres:5432/mydb

EXPOSE 3000


CMD ["npm", "start"]