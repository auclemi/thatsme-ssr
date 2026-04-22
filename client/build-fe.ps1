# ============================
# BUILD FRONTEND (Angular SSR)
# ============================
# powershell -ExecutionPolicy Bypass -File build-fe.ps1
$ErrorActionPreference = "Stop"
Write-Host "Build Angular SSR"

# Répertoires
$DEV_FE = "C:\Users\AUCLERMI\projects\thatsme-ssr\client"
$PROD_FE = "C:\Users\AUCLERMI\projects\thatsme-ssr-production\angular"

# Aller dans le dossier client
Set-Location $DEV_FE

# Build SSR
npm run build:production

# Stop PM2 pour libérer les fichiers
pm2 stop thatsme-ssr -ErrorAction SilentlyContinue


Write-Host "Nettoyage du dossier PROD Angular"
if (Test-Path $PROD_FE) {
    Remove-Item $PROD_FE -Recurse -Force
}

# Recréation du dossier PROD
New-Item -ItemType Directory -Path $PROD_FE | Out-Null

Write-Host "Copie des fichiers Angular SSR vers PROD"
Copy-Item "$DEV_FE\dist\thatsme-angular\browser" "$PROD_FE\browser" -Recurse
Copy-Item "$DEV_FE\dist\thatsme-angular\server" "$PROD_FE\server" -Recurse

Write-Host "FE deploye dans le dossier PROD"

# Redémarrage du frontend sur port 4000
pm2 restart "$PROD_FE\server\server.mjs" --name thatsme-ssr

