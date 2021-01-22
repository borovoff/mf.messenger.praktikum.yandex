#FROM node:14
#WORKDIR app
#COPY . .
#RUN npm install && \
#    npm run deploy

FROM nginx
#COPY --from=0 app/dist /usr/share/nginx/messenger
COPY default.conf.template /etc/nginx/conf.d
COPY up.sh .
CMD sh up.sh
