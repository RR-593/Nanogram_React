FROM node:23-alpine

WORKDIR /app

COPY package*.json .

RUN apk add git
RUN apk add openssh

RUN npm i -g npm-check-updates
RUN ncu -u

# RUN npm install react-scripts

RUN npm install

# RUN npm install gh-pages --save-dev

# RUN npm install jquery --save

COPY . .

EXPOSE 3000
# required for docker desktop port mapping

# CMD ["npm","start"]
