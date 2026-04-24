# ===============================
#   BUILD FRONTEND — THAT'S ME
# ===============================

Write-Host "=== BUILD FRONTEND (FE) ==="

# Dossiers DEV et PROD
$devFePath  = "C:\Users\AUCLERMI\projects\thatsme-ssr\client"
$prodFePath = "C:\Users\AUCLERMI\projects\thatsme-ssr-production\angular"

Write-Host "DEV folder : $devFePath"
Write-Host "PROD folder : $prodFePath"

# 1) Nettoyage du dossier PROD FRONT
Write-Host "PROD FRONT Clean-up..."
if (Test-Path $prodFePath) {
    Remove-Item $prodFePath -Recurse -Force
}
New-Item -ItemType Directory -Path $prodFePath | Out-Null

# 2) Build Angular SSR dans DEV
Write-Host "Building Angular SSR..."
Set-Location $devFePath
npm install
npm run build:production

# 3) Copie vers PROD
Write-Host "Copy frontend to PROD..."
Copy-Item "$devFePath\package.json"        "$prodFePath\package.json"
Copy-Item "$devFePath\package-lock.json"   "$prodFePath\package-lock.json"
Copy-Item "$devFePath\dist"                "$prodFePath\dist" -Recurse -Force


# 4) Installation des dépendances en PROD
Write-Host "Dependencies installation..."
Set-Location $prodFePath
npm install --omit=dev

# 5) Vérification du process PM2
Write-Host "PM2 processes check 'thatsme-front'..."
$pm2List = pm2 list
$exists  = $pm2List -match "thatsme-front"
$online  = $pm2List -match "online"

# 6) Start ou restart
if (-not $exists -or -not $online) {
    Write-Host "Process absent ou offline → START"
    pm2 start dist/thatsme-angular/server/server.mjs --name thatsme-front
} else {
    Write-Host "Process online → RESTART"
    pm2 restart thatsme-front
}

# 7) Sauvegarde PM2
Write-Host "PM2 backup..."
pm2 save

Write-Host "Frontend deployed and working =================================================================="
Set-Location $devFePath
