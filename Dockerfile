# 1. Use the "Slim" version (Debian-based) instead of Alpine
# This fixes the OpenSSL/Prisma compatibility issues
FROM node:18-slim

# 2. Install OpenSSL (Required for Prisma to talk to the DB)
RUN apt-get update -y && apt-get install -y openssl

# 3. Set working directory
WORKDIR /app

# 4. Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# 5. Install dependencies
RUN npm ci

# 6. Generate Prisma Client
RUN npx prisma generate

# 7. Copy source code
COPY . .

# 8. Build TypeScript
RUN npm run build

# 9. Expose port
EXPOSE 3000

# 10. Start the app
CMD ["npm", "start"]