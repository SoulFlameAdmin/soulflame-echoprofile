$ErrorActionPreference = "Stop"

$projectPath = "E:\SoulFlame_EchoProfile_MVP"
$backupsRoot = "$projectPath\backups"

$latest = Get-ChildItem $backupsRoot -Directory |
  Where-Object { $_.Name -like "v19_to_v20_*" } |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (!$latest) {
  Write-Host "No V20 backup found." -ForegroundColor Red
  exit 1
}

Write-Host "Latest V20 backup:" -ForegroundColor Cyan
Write-Host $latest.FullName -ForegroundColor Yellow

$confirm = Read-Host "Type RESTORE to rollback V20"
if ($confirm -ne "RESTORE") {
  Write-Host "Rollback cancelled." -ForegroundColor Yellow
  exit 0
}

foreach ($file in Get-ChildItem $latest.FullName -File) {
  Copy-Item $file.FullName "$projectPath\$($file.Name)" -Force
}

Write-Host "Rollback V20 completed." -ForegroundColor Green
