FROM node:18-alpine

WORKDIR /front

EXPOSE 3000

COPY ["package.json", "package.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]
