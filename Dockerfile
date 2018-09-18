FROM node:9-slim

WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build
RUN rm -rf node_modules
RUN rm -r src
RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start:production"]
