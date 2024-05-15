FROM node:20-alpine

WORKDIR /usr/src/

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start:migrate:dev"]
