FROM ubuntu:latest

RUN apt-get update
RUN apt install nodejs -y
RUN apt-get install npm -y




WORKDIR /testApp

COPY . /testApp/

RUN npm install

# Expose the port (e.g., 3000) your app runs on
EXPOSE 3000

CMD [ "node","server.js" ]
