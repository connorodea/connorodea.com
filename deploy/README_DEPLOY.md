# Deploy — connorodea.com

Static Next.js export → hetznerCO (`5.161.239.237`), served by nginx.

## Automatic (CI/CD)
Push to `main` → GitHub Actions builds `out/` and rsyncs to
`/var/www/connorodea.com/html/`, then reloads nginx.

Requires repo secrets: `HETZNER_CO_HOST`, `HETZNER_CO_USER`, `HETZNER_CO_SSH_KEY`.

## Manual
```
npm ci && npm run build
rsync -az --delete out/ hetznerCO:/var/www/connorodea.com/html/
ssh hetznerCO 'sudo systemctl reload nginx'
```

## Infra
- nginx vhost: `/etc/nginx/sites-available/connorodea.com`
- TLS: Let's Encrypt via certbot (`certbot --nginx -d connorodea.com -d www.connorodea.com`)
- DNS: Namecheap; apex + www A records → 5.161.239.237
