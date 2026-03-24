#!/bin/bash
set -e

echo "Starting Studio deployment..."

cd ~/studio

if [ "$SKIP_PULL" != "true" ]; then
  echo "Pulling latest code from GitHub..."
  git pull origin main
fi

echo "Cleaning up Docker build cache and unused images..."
docker builder prune -f
docker image prune -f

echo "Building new image (old container still serving)..."
if ! docker compose build; then
  echo "Build failed, retrying with --no-cache..."
  docker builder prune -af
  docker compose build --no-cache
fi

echo "Swapping to new container..."
docker compose up -d --wait --wait-timeout 120

echo "Deployment complete!"
echo ""
echo "Container status:"
docker compose ps

echo ""
echo "Recent logs:"
docker compose logs --tail=50
