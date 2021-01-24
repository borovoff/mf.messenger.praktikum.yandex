FROM node:14
WORKDIR app
COPY . .
RUN npm install && \
    npm run deploy

EXPOSE 80
CMD npm run start
