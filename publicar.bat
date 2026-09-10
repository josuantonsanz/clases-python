@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ============================================
echo  Publicar el tema en GitHub Pages
echo ============================================
echo.

echo [1/4] Generando el HTML con Node...
node build.js
if errorlevel 1 (
  echo.
  echo ERROR: no se pudo generar el HTML. Comprueba que Node.js esta instalado.
  echo.
  pause
  exit /b 1
)
echo.

echo [2/4] Preparando los cambios...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
  echo No hay cambios nuevos que subir.
  echo.
  pause
  exit /b 0
)

set "MSG=%~1"
if "%MSG%"=="" set /p "MSG=Mensaje del commit [Enter = por defecto]: "
if "%MSG%"=="" set "MSG=Actualizar material de clase"

echo.
echo [3/4] Guardando cambios: %MSG%
git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo ERROR al crear el commit.
  pause
  exit /b 1
)

echo.
echo [4/4] Subiendo a GitHub...
git push
if errorlevel 1 (
  echo.
  echo ERROR al subir. Revisa tu conexion y tus credenciales de GitHub.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  Listo. Web actualizada en:
echo  https://clases-python.glosasdeguardia.es/
echo  Puede tardar un minuto en verse. Recarga con Ctrl+F5.
echo ============================================
echo.
pause
