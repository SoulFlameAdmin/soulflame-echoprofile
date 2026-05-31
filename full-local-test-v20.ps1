$ErrorActionPreference = "Stop"

$projectPath = "E:\SoulFlame_EchoProfile_MVP"
cd $projectPath

Write-Host ""
Write-Host "V20 Full Local Test" -ForegroundColor Cyan
Write-Host ""

node scripts\env-audit-v20.js
node scripts\launch-readiness-v20.js

Write-Host ""
Write-Host "Testing local health endpoint requires running server." -ForegroundColor Yellow
Write-Host "Open: http://localhost:3000/api/health" -ForegroundColor Cyan
Write-Host ""
