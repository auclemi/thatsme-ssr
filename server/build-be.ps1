# ===============================
#   BUILD BACKEND — THAT'S ME
# ===============================

Write-Host "=== BUILD BACKEND (BE) ==="
Write-Host "PM2 STOP..."
pm2 delete all
pm2 kill

# Dossiers DEV et PROD
$devBePath  = "C:\Users\AUCLERMI\projects\thatsme-ssr\server"
$prodBePath = "C:\Users\AUCLERMI\projects\thatsme-ssr-production\api"

Write-Host "DEV folder  : $devBePath"
Write-Host "PROD folder: $prodBePath"

# 1) Nettoyage du dossier PROD API
Write-Host "PROD API clean-up..."
if (Test-Path $prodBePath\dist) {
    Remove-Item $prodBePath\dist -Recurse -Force
}
#New-Item -ItemType Directory -Path $prodBePath | Out-Null

# 2) Copie des fichiers backend DEV → PROD
Write-Host "Copy backend to PROD..."
Copy-Item "$devBePath\package.json"        "$prodBePath\package.json"
Copy-Item "$devBePath\package-lock.json"   "$prodBePath\package-lock.json"
Copy-Item "$devBePath\dist"                "$prodBePath\dist" -Recurse -Force
Copy-Item "$devBePath\.env.production" "$prodBePath\.env" -Force


# 3) Installation des dépendances dans le bon dossier
Write-Host "Dependencies installation..."
Set-Location $prodBePath
npm install --omit=dev

# 4) Vérification du process PM2
Write-Host "Checking PM2 processes'thatsme-api'..."
$pm2List = pm2 list
$exists  = $pm2List -match "thatsme-api"
$online  = $pm2List -match "online"

# 5) Start ou restart
if (-not $exists -or -not $online) {
    Write-Host "Process absent ou offline → START"
    pm2 start dist/main.js --name thatsme-api
} else {
    Write-Host "Process online → RESTART"
    pm2 restart thatsme-api
}

# 6) Sauvegarde de l'état PM2
Write-Host "PM2 backup..."
pm2 save

Write-Host "Backend deployed and working ================================================="

# Retour au dossier initial
Set-Location $devBePath
