$ErrorActionPreference = "Stop"

$projectPath = "E:\SoulFlame_EchoProfile_MVP"
cd $projectPath

node scripts\v23-vercel-preflight.js

Write-Host ""
Write-Host "Local health check:" -ForegroundColor Cyan

try {
  $health = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET
  $health | ConvertTo-Json -Depth 10

  if ($health.activeDataMode -ne "supabase") {
    Write-Host "WARNING: local activeDataMode is not supabase." -ForegroundColor Yellow
  }
} catch {
  Write-Host "Local server is not running. This is OK for V23 prep, but run node server.js before local tests." -ForegroundColor Yellow
}
