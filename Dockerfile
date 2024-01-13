FROM node:16-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
EXPOSE 4000
COPY . .
CMD npm run start