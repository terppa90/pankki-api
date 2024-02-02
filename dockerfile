FROM node:21-alpine AS builder
WORKDIR /bank-api-local

COPY package*.json ./
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci
RUN npm run build

FROM node:21-alpine AS final

WORKDIR /bank-api-local
COPY --from=builder ./bank-api-local/dist ./dist
COPY ./package*.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]