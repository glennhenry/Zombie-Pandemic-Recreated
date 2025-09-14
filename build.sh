#!/usr/bin/env bash
set -e

# clean deploy
rm -rf deploy
mkdir -p deploy/site

# export site
cd site
kobweb export --notty --layout static
cd ..

# copy exported site
cp -r site/.kobweb/site/* deploy/site/

# build server
./gradlew :server:shadowJar

# copy assets
cp -r assets deploy/

echo "Build finished. See deploy/ folder."
