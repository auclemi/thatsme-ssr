# ============================
# BUILD BACKEND (NestJS)
# ============================
$ErrorActionPreference = "Stop"

Write-Host "Build NestJS"

# Répertoires
$DEV_BE = "C:\Users\AUCLERMI\projects\thatsme-ssr\server"
$PROD_BE = "C:\Users\AUCLERMI\projects\thatsme-ssr-production\api"

# Aller dans le dossier server
Set-Location $DEV_BE

# Build Nest
npm run build

# Stop PM2 pour libérer les fichiers
pm2 stop thatsme-api -ErrorAction SilentlyContinue



Write-Host "Nettoyage du dossier PROD API"
if (Test-Path $PROD_BE\dist) {
    Remove-Item $PROD_BE\dist -Recurse -Force
}


Write-Host "Copie du backend vers PROD"
Copy-Item "$DEV_BE\dist" "$PROD_BE\dist" -Recurse

Write-Host "BE deploye dans le dossier PROD"

# Redémarrage de PM2
pm2 restart "$PROD_BE\dist\main.js" --name thatsme-api
Write-Host "BE tourne sur le port 3000"