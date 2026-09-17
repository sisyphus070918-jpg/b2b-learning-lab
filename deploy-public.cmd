@echo off
chcp 65001 >nul
setlocal
title 发布出海研习社到稳定公网

cd /d "%~dp0"
echo [1/3] 正在生成正式网站文件...
call npm run build
if errorlevel 1 goto :failed

echo.
echo [2/3] 正在检查 Cloudflare 登录...
call npx --yes wrangler whoami >nul 2>&1
if errorlevel 1 (
  echo 浏览器即将打开 Cloudflare 登录页。请登录或免费注册，并点击授权。
  call npx --yes wrangler login
  if errorlevel 1 goto :failed
)

echo.
echo [3/3] 正在发布稳定公网版本...
call npx --yes wrangler pages deploy dist --project-name=b2b-learning-lab-0916 --branch=main --commit-dirty=true
if errorlevel 1 goto :failed

echo.
echo 发布成功。稳定分享地址：https://b2b-learning-lab-0916.pages.dev/
echo 以后更新内容后，再双击本文件即可重新发布。
pause
exit /b 0

:failed
echo.
echo 发布没有完成。请保留此窗口中的错误信息，再回到 Codex 告诉我。
pause
exit /b 1
