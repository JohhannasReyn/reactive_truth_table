@echo off
setlocal enabledelayedexpansion

REM Debug version with verbose output
echo on

REM Set default values
set TARGET=%1
if "%TARGET%"=="" set TARGET=production

set DOCKER_TAG=%2
if "%DOCKER_TAG%"=="" set DOCKER_TAG=reactive-truth-table:%TARGET%

set DOCKER_DEFAULT_PLATFORM=%3
if "%DOCKER_DEFAULT_PLATFORM%"=="" set DOCKER_DEFAULT_PLATFORM=linux/amd64

@echo off
echo === DEBUG BUILD SCRIPT ===
echo TARGET: %TARGET%
echo DOCKER_TAG: %DOCKER_TAG%
echo DOCKER_DEFAULT_PLATFORM: %DOCKER_DEFAULT_PLATFORM%
echo ==========================
echo.

if /i "%TARGET%"=="production" (
    echo Building production image...
    echo on
    docker build --platform %DOCKER_DEFAULT_PLATFORM% -t %DOCKER_TAG% .
    @echo off
) else (
    echo Building %TARGET% image...
    echo on
    docker build --platform %DOCKER_DEFAULT_PLATFORM% --target %TARGET% -t %DOCKER_TAG% .
    @echo off
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo *** BUILD FAILED ***
    echo Check the error messages above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Build completed: %DOCKER_TAG%
echo Checking if image exists:
docker images | findstr %DOCKER_TAG%

echo.
echo *** BUILD SUCCESSFUL ***
pause