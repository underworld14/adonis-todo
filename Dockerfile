FROM node:16-alpine

WORKDIR /home/node/app

COPY . .

RUN npm ci
RUN npm run build

# Set environment variables
ENV HOST=0.0.0.0
ENV APP_KEY=8XCbRYkGOqta0Sj74AFCVyMa44m2oS2k
ENV PORT=3030
ENV NODE_ENV=production
ENV DRIVE_DISK=local
ENV DB_CONNECTION=mysql

EXPOSE 3030

CMD [ "node", "build/server.js" ]
