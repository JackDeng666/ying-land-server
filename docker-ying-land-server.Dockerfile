FROM node:lts-alpine
WORKDIR /app
RUN npm install -g pm2
COPY /node_modules ./node_modules
COPY /dist ./dist
COPY .env.dev ./.env.dev
COPY .env.prod ./.env.prod


# RUN npm install --production

# COPY . .

EXPOSE 3060

# CMD NODE_ENV=prod node main
CMD ["pm2-runtime", "start", "dist/main.js"]
