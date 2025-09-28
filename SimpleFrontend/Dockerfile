FROM node:alpine

# Устанавливаем простой HTTP-сервер
RUN npm install -g http-server

WORKDIR /app
COPY SimpleFrontend/index.html ./
COPY SimpleFrontend/style.css/ ./
COPY SimpleFrontend/app.js/ ./

EXPOSE 80
CMD ["http-server", "-p", "80", "-a", "0.0.0.0"]