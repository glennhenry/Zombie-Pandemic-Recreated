@echo off
setlocal

echo === Cleaning build directory ===
if exist build (
	rmdir /s /q build || pause && exit /b
)
mkdir build

echo === Building React client ===
cd client
call npm install
call npm run build
cd ..

echo === Building Ktor server ===
cd server
call gradlew.bat shadowJar
cd ..

echo === Build complete. Output is in build\
exit /b 0
