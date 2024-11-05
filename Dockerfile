FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN apk add git

RUN npm install

RUN npm install gh-pages --save-dev

RUN npm install jquery --save

COPY . .

EXPOSE 3000
# required for docker desktop port mapping

# CMD ["npm", "start"]
CMD ["npm","start"]
