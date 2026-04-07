@echo off
setlocal
cd /d "%~dp0"

set "GIT=%ProgramFiles%\Git\bin\git.exe"
set "GH=%ProgramFiles%\GitHub CLI\gh.exe"

if not exist "%GIT%" (
  echo Git not found. Install from https://git-scm.com/download/win
  pause
  exit /b 1
)
if not exist "%GH%" (
  echo GitHub CLI not found. Run: winget install GitHub.cli
  pause
  exit /b 1
)

echo Checking GitHub login...
"%GH%" auth status >nul 2>&1
if errorlevel 1 (
  echo A browser window will open - sign in to GitHub.
  "%GH%" auth login -h github.com -p https -w
  if errorlevel 1 (
    echo Login failed or cancelled.
    pause
    exit /b 1
  )
)

echo Removing old remote if any...
"%GIT%" remote remove origin 2>nul

echo Creating repo and pushing...
"%GH%" repo create my-portfolio --public --source=. --remote=origin --push
if errorlevel 1 (
  echo.
  echo If it says the repo already exists, run manually:
  echo   "%GIT%" push -u origin main
  pause
  exit /b 1
)

echo.
echo Done. On GitHub, open your profile - you should see repo "my-portfolio".
pause
