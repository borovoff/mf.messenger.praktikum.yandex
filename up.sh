#!/bin/sh
/usr/bin/envsubst \$PORT < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
/usr/sbin/nginx -g "daemon off;"
