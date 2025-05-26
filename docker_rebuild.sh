#!/bin/bash

echo "================================"
echo " Rebuilding Truth Table App"
echo "================================"

echo "Stopping existing container..."
docker stop reactive_truth_table 2>/dev/null

echo "Removing existing container..."
docker rm reactive_truth_table 2>/dev/null

echo "Building new image..."
docker build --target production -t reactive-truth-table:prod .

if [ $? -ne 0 ]; then
    echo "Build failed! Check the errors above."
    exit 1
fi

echo "Starting new container on port 3000..."
docker run -d --name reactive_truth_table -p 3000:80 reactive-truth-table:prod

if [ $? -ne 0 ]; then
    echo "Failed to start container on port 3000! Trying port 8080..."
    docker run -d --name reactive_truth_table -p 8080:80 reactive-truth-table:prod
    
    if [ $? -ne 0 ]; then
        echo "Failed to start on both ports. Check what's using the ports."
        exit 1
    fi
    echo "App started on http://localhost:8080"
else
    echo "App started on http://localhost:3000"
fi

echo ""
echo "================================"
echo " Rebuild Complete!"
echo "================================"
echo "You can now test your changes."