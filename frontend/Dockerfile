FROM  node:16.17.0
WORKDIR /app

RUN yarn global add npm
RUN yarn global add quasar@2
RUN yarn global add @quasar/cli

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn
COPY . .

EXPOSE 9000

CMD [ "yarn", "dev" ]
