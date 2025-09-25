#!/bin/sh
set -e

# Test nginx config
echo "Testing nginx config..."
nginx -t

# Start the API (Nest compiled JS)
echo "Starting API..."
node /app/apps/api/dist/main.js &
API_PID=$!

# Start nginx in foreground
echo "Starting nginx..."
nginx -g 'daemon off;' &
NGINX_PID=$!

# Wait on either process to exit
wait -n $API_PID $NGINX_PID
exit $?


