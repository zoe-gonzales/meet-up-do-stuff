# Build Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /meet-up-do-stuff .
# Build React app
FROM node:alpine AS node_builder
COPY --from=builder /app/client ./
RUN npm install
RUN npm run build
# Container deployed to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /meet-up-do-stuff ./
COPY --from=node_builder /build ./web
RUN chmod +x ./meet-up-do-stuff
EXPOSE 1333
CMD ./meet-up-do-stuff