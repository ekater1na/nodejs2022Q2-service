FROM node:16.16-alpine3.16
WORKDIR /usr/src/app
COPY package*.json .
COPY prisma ./prisma/ 
RUN npm ci && mv node_modules ../
COPY . .

RUN npx prisma generate
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start:dev"]
