@echo off
setlocal
rmdir /s /q deploy 2>nul
mkdir deploy\site

rem export site
cd site
call kobweb export --notty --layout static
cd ..

rem copy exported site
xcopy site\.kobweb\site\* deploy\site\ /E /I /Y >nul

rem build server
call gradlew.bat :server:shadowJar

rem copy assets
xcopy assets deploy\assets\ /E /I /Y >nul

echo Build finished. See deploy\ folder.
endlocal
