@echo off
echo ================================
echo  Running Tests
echo ================================

echo Building test image...
docker build --target test -t reactive-truth-table:test .

if %ERRORLEVEL% neq 0 (
    echo Test build failed!
    pause
    exit /b 1
)

echo Running tests...
docker run --rm reactive-truth-table:test

echo.
echo ================================
echo  Tests Complete!
echo ================================
pause