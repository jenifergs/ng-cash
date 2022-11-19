FROM node:16 as build

ARG ENVIRONMENT

WORKDIR /backend

COPY package.json ./
ADD . ./

RUN ping -c 3 google.com 
RUN npm install
RUN echo "npm run build" >> init.sh
RUN echo "npm run migrate" >> init.sh
RUN echo "npm run start" >> init.sh
RUN chmod +x init.sh
CMD ["./init.sh"]