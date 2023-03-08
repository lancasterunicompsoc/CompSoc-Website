FROM alpine:3.14

RUN apk add --update --no-cache hugo

WORKDIR /site

COPY . .

EXPOSE 1313

CMD ["hugo", "server", "--bind", "0.0.0.0"]

