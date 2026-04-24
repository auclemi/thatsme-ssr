# ============================================
# BUILD and deploy BACKEND (NestJS) & Angular
# ==========================================
$ErrorActionPreference = "Stop"

Write-Host "Build NestJS"
cd server
.\build-be.ps1

Write-Host "Build Angular"
cd ..\client
.\build-fe.ps1
cd ..
Write-Host "Build termine. ================================================================"
