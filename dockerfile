FROM node:12.17.0-alpine as zero
WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

## this is stage two , where the app actually runs

FROM node:12.17.0-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --only=production

COPY --from=zero /usr/app/dist ./dist

EXPOSE 4000
CMD npm start