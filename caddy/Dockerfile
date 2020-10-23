FROM caddy:2.1.1-builder AS builder

RUN caddy-builder \
    github.com/caddy-dns/digitalocean

FROM caddy:2.1.1-alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

