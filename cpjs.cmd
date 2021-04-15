del /q "D:\Projects\assetup\back\src\main\resources\static\*"
FOR /D %%p IN ("D:\Projects\assetup\back\src\main\resources\static\*.*") DO rmdir "%%p" /s /q
xcopy D:\Projects\assetup\front\build\ D:\Projects\assetup\back\src\main\resources\static\ /s /e
del /q "D:\Projects\assetup\front\build\*"
FOR /D %%p IN ("D:\Projects\assetup\front\build\*.*") DO rmdir "%%p" /s /q