#!/bin/bash

set -e

echo "=== Cleaning build directory ==="
if [ -d build ]; then
  rm -rf build
fi
mkdir build

echo "=== Building React client ==="
cd client
npm install
npm run build
cd ..

echo "=== Building Ktor server ==="
cd server
./gradlew shadowJar
cd ..


echo "=== Build complete. Output is in ./build/"
