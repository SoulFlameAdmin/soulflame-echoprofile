cd E:\SoulFlame_EchoProfile_MVP

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "V30 LOCAL PRODUCTION URL TEST" -ForegroundColor Cyan
Write-Host ""

$base = "https://soulflame-twins.vercel.app"

Write-Host "Testing health..." -ForegroundColor Yellow
Invoke-RestMethod "$base/api/health"

Write-Host ""
Write-Host "Testing profile write..." -ForegroundColor Yellow

$body = @{
  id = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  user = @{
    name = "V30 PowerShell Test"
    contact = "v30-powershell@soulflame.local"
    goal = "V30 PowerShell test"
    age = "25-34"
  }
  mainTrait = "vision"
  secondTrait = "logic"
  profile = "V30 PowerShell Profile"
  scores = @{
    vision = 10
    logic = 9
    emotion = 6
    social = 5
    action = 8
  }
  report = "V30 PowerShell mini report"
  fullReport = "V30 PowerShell full report"
  createdAt = (Get-Date).ToString("s")
} | ConvertTo-Json -Depth 10

Invoke-RestMethod `
  -Uri "$base/api/profile" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body