@echo off
echo ================================
echo  Rebuilding Truth Table App
echo ================================

echo Stopping existing container...
docker stop reactive_truth_table 2>nul

echo Removing existing container...
docker rm reactive_truth_table 2>nul

echo Building new image...
docker build --target production -t reactive-truth-table:prod .

if %ERRORLEVEL% neq 0 (
    echo Build failed! Check the errors above.
    pause
    exit /b 1
)

echo Starting new container on port 3000...
docker run -d --name reactive_truth_table -p 3000:80 reactive-truth-table:prod

if %ERRORLEVEL% neq 0 (
    echo Failed to start container! Trying port 8080...
    docker run -d --name reactive_truth_table -p 8080:80 reactive-truth-table:prod
    
    if %ERRORLEVEL% neq 0 (
        echo Failed to start on both ports. Check what's using the ports.
        pause
        exit /b 1
    )
    echo App started on http://localhost:8080
) else (
    echo App started on http://localhost:3000
)

echo.
echo ================================
echo  Rebuild Complete!
echo ================================
echo You can now test your changes.
pause