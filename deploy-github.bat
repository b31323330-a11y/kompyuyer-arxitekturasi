@echo off
chcp 65001 > nul
echo ====================================================
echo  KOMPYUTER ARXITEKTORI - GITHUB PUSH SKRIPTI
echo ====================================================
echo.

set /p REPO_URL="GitHub Repository URL manzilini kiriting (masalan: https://github.com/b31323330-a11y/kompyuter-arxitektori.git): "

if "%REPO_URL%"=="" (
    echo [XATO] URL kiritilmadi!
    pause
    exit /b
)

echo.
echo [1/3] Remote origin tekshirilmoqda...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Branch main ga tekislanmoqda...
git branch -M main

echo [3/3] GitHub ga push qilinmoqda...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================
    echo  [MUVAFFAQIN! LOYIHA GITHUB GA YUKLANDI!]
    echo ====================================================
) else (
    echo.
    echo [OGOHLANTIRISH] Push jarayonida xatolik yuz berdi.
    echo Iltimos, GitHub repository yaratilganligini va unga kirish huquqingiz borligini tekshiring.
)

pause
