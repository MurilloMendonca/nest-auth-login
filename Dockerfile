# development stage
FROM node:latest AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production=false

COPY . .

RUN npm run build

# production stage
FROM node:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
