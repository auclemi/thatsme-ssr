#!/bin/bash
echo "🔨 Build production..."
npm run build:production

echo "🚀 Restart PM2..."
pm2 startOrRestart ecosystem.config.js

echo "✅ Déployé !"