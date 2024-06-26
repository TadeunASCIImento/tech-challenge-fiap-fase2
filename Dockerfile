FROM node:18-alpine

WORKDIR /blogging/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm i -g pnpm

RUN pnpm build

EXPOSE 3000

CMD ["sh", "-c", "node build/app && npx typeorm migration:run -d ./build/lib/orm/typeorm.config.js && npm run start"]