#!/bin/sh

# Debug version with verbose output
set -x  # This will show each command as it's executed

TARGET=${1:-production}
DOCKER_TAG=${2:-reactive-truth-table:${TARGET}}
DOCKER_DEFAULT_PLATFORM=${3:-linux/amd64}

echo "=== DEBUG BUILD SCRIPT ==="
echo "TARGET: $TARGET"
echo "DOCKER_TAG: $DOCKER_TAG"
echo "DOCKER_DEFAULT_PLATFORM: $DOCKER_DEFAULT_PLATFORM"
echo "=========================="

if [ "$TARGET" = "production" ]; then
    echo "Building production image..."
    docker build --platform $DOCKER_DEFAULT_PLATFORM -t $DOCKER_TAG .
else
    echo "Building $TARGET image..."
    docker build --platform $DOCKER_DEFAULT_PLATFORM --target $TARGET -t $DOCKER_TAG .
fi

echo "Build completed: $DOCKER_TAG"
echo "Checking if image exists:"
docker images | grep $DOCKER_TAG