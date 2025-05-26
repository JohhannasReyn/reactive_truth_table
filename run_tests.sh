#!/usr/bin/env sh
set -e

# Check if we're running inside Docker
if [ -f /.dockerenv ]; then
    # We're inside Docker, run tests directly
    npm test
else
    # We're outside Docker, build and run the container
    echo "Building test Docker image..."
    ./build_docker.sh test
    
    echo "Running tests..."
    docker run --rm reactive-truth-table:test
    
    echo "Tests completed!"
fi