$ErrorActionPreference = "SilentlyContinue"
$Port = 5173
$Root = "E:\SoulFlame_EchoProfile_MVP\Soulmatch"

Add-Type -AssemblyName System.Web

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "Soulmatch running on http://localhost:$Port" -ForegroundColor Green
}
catch {
    Write-Host "Could not start localhost server. Maybe port is already used." -ForegroundColor Yellow
    Start-Process "http://localhost:$Port"
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $urlPath = $context.Request.Url.AbsolutePath.TrimStart("/")
        if ([string]::IsNullOrWhiteSpace($urlPath)) { $urlPath = "index.html" }

        $filePath = Join-Path $Root $urlPath

        if (!(Test-Path $filePath)) {
            $context.Response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            $context.Response.Close()
            continue
        }

        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        switch ($ext) {
            ".html" { $context.Response.ContentType = "text/html; charset=utf-8" }
            ".css"  { $context.Response.ContentType = "text/css; charset=utf-8" }
            ".js"   { $context.Response.ContentType = "application/javascript; charset=utf-8" }
            ".json" { $context.Response.ContentType = "application/json; charset=utf-8" }
            default { $context.Response.ContentType = "application/octet-stream" }
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.Close()
    }
    catch {}
}
