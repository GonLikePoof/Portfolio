# Creates github.com/GonLikePoof/my-portfolio (if missing) and pushes main.
# First run will open the browser once for GitHub login.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$git = "C:\Program Files\Git\bin\git.exe"
$gh = Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"

if (-not (Test-Path $git)) {
  Write-Error "Git not found at $git"
}
if (-not (Test-Path $gh)) {
  Write-Error "GitHub CLI not found at $gh. Install with: winget install GitHub.cli"
}

& $gh auth status 2>$null | Out-Null
if (-not $?) {
  Write-Host "Opening GitHub login in your browser..."
  & $gh auth login -h github.com -p https -w
}

& $git remote remove origin 2>$null
Write-Host "Creating repo (if needed) and pushing..."
& $gh repo create my-portfolio --public --source=. --remote=origin --push

$user = (& $gh api user -q .login).Trim()
Write-Host ""
Write-Host "Done. Repo: https://github.com/$user/my-portfolio"
