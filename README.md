# Puppeteer Web Service

This service is a containerized simple wrapper around puppeteer script

## How to build

1. Open Dockerfile
2. Find `ENV URL=...` and paste there your desired url
3. `docker build .`

## How to run

Exposed port by default is 8080

1. `docker run -p 5000:8080 image_id`

## Example request

```
POST http://localhost:5000/taxStatus
Content-Type: application/json

{
  "inn": "1234567890",
  "date": "2021-01-16"
}
```

## Some notes

- Average request time is around 1s
