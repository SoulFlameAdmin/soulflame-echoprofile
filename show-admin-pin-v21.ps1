$projectPath = "E:\SoulFlame_EchoProfile_MVP"
$pinFile = "$projectPath\private\v21-admin-pin.txt"

if (Test-Path $pinFile) {
  Get-Content $pinFile
} else {
  Write-Host "PIN file missing. Run .\generate-admin-pin-v21.ps1" -ForegroundColor Red
}
