@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
set "SITE_URL=http://127.0.0.1:5173/"

where node >nul 2>nul
if errorlevel 1 (
  echo 未检测到 Node.js，无法启动本地学习网站。
  pause
  exit /b 1
)

if not exist node_modules (
  echo 正在准备首次运行所需文件……
  call npm ci
  if errorlevel 1 (
    echo 安装失败，请检查网络后重试。
    pause
    exit /b 1
  )
)

curl.exe -fsS --max-time 2 "%SITE_URL%" >nul 2>nul
if not errorlevel 1 goto open_site

echo 正在启动出海研习社……
start "出海研习社服务" /min cmd /c "cd /d ""%~dp0"" && npm run dev"

for /l %%i in (1,1,30) do (
  curl.exe -fsS --max-time 2 "%SITE_URL%" >nul 2>nul
  if not errorlevel 1 goto open_site
  ping 127.0.0.1 -n 2 >nul
)

echo 本地网站启动超时。请稍后再次双击此文件。
pause
exit /b 1

:open_site
start "" "%SITE_URL%"
exit /b 0
