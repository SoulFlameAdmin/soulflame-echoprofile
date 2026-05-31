$projectPath = "E:\SoulFlame_EchoProfile_MVP"
cd $projectPath

Write-Host ""
Write-Host "Open this guide:" -ForegroundColor Cyan
Write-Host "$projectPath\docs\vercel\V23_ENV_VARIABLES.md" -ForegroundColor Yellow
Write-Host ""

notepad "$projectPath\.env.vercel.example"
