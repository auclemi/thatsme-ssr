Write-Host "Build NestJS..."
cd server
npm run build
cd ..

Write-Host "Build Angular avec prerender..."
cd client
npm run build:production
cd ..

Write-Host "Restart PM2..."
pm2 restart ecosystem.config.js

Write-Host "Deploye !"