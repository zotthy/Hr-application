FROM node:18-alpine AS build_stage

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve
COPY --from=build_stage /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]