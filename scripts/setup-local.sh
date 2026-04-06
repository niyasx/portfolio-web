#!/usr/bin/env bash
# One-shot local setup: Postgres (Docker) → migrations → seed.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not in PATH."
  echo "Install Docker Desktop (https://www.docker.com/products/docker-desktop/), then run:"
  echo "  npm run setup:local"
  exit 1
fi

echo "Starting Postgres…"
docker compose up -d

echo "Waiting for database to accept connections…"
for _ in $(seq 1 40); do
  if docker compose exec -T db pg_isready -U portfolio -d portfolio >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! docker compose exec -T db pg_isready -U portfolio -d portfolio >/dev/null 2>&1; then
  echo "Postgres did not become ready in time. Check: docker compose logs db"
  exit 1
fi

echo "Applying migrations…"
npx prisma migrate deploy

echo "Seeding data and admin user…"
npx prisma db seed

echo ""
echo "Done."
echo "  • Site:     http://localhost:3000"
echo "  • Admin:    http://localhost:3000/admin/login"
echo "  • Email:    value of ADMIN_EMAIL in .env"
echo "  • Password: value of ADMIN_PASSWORD in .env (change after first login)"
echo ""
echo "Start the app: npm run dev"
