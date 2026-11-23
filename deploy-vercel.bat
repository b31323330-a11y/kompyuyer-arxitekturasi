@echo off
chcp 65001 > nul
echo ====================================================
echo  KOMPYUTER ARXITEKTORI - VERCEL DEPLOY SKRIPTI
echo ====================================================
echo.
echo [1/2] Loyiha build qilinmoqda (Production)...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [XATO] Build muvaffaqiyatsiz tugadi!
    pause
    exit /b
)

echo.
echo [2/2] Vercel ga deploy qilinmoqda...
call npx vercel --prod

pause
