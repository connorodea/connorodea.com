# Deploy — connorodea.com

Static Next.js export → hetznerCO (`5.161.239.237`), served by nginx.

## Publish the booking page from your computer

Use the checkout containing the booking-page change. Requires Node.js 20.9+,
npm, SSH, rsync, curl, and an existing working `hetznerCO` SSH alias with its
host key already trusted. The SSH user must be able to write to
`/var/www/connorodea.com/html/`.

From the repository root:

```bash
bash deploy/publish-booking.sh
```

Or pass an existing SSH alias or `user@hostname`:

```bash
bash deploy/publish-booking.sh my-server-alias
```

The script checks access, runs `npm ci` and a full production build, validates
the homepage and booking export, then uploads assets before HTML. It preserves
existing remote files, permissions, keys, and nginx configuration. It prints
success only after `https://connorodea.com/book` returns the exact exported
booking page and verified Calendly destination.

The scheduling destination is centralized in `src/content/booking.ts`. The
publisher also checks the verified destination explicitly; update both together
if the booking address changes.

## Automatic deployment (not configured)

The existing workflow declares deployment on pushes to `main`, using repository
secrets `HETZNER_CO_HOST`, `HETZNER_CO_USER`, and `HETZNER_CO_SSH_KEY`. As checked
on 2026-11-14, those secrets are not configured and the site-build PR remains
open. Use the local publisher above for this update.

## Infra
- nginx vhost: `/etc/nginx/sites-available/connorodea.com`
- TLS: Let's Encrypt via certbot (`certbot --nginx -d connorodea.com -d www.connorodea.com`)
- DNS: Namecheap; apex + www A records → 5.161.239.237
