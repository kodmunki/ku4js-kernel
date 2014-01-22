::===============kodmunki™ build process==============
:: This build process is dependent upon yuicompressor
::  and a specific directory structure:
::
::  root
::    _build (This build script and the yuicompressor)
::    bin (The compiled scripts will appear here)
::    src (All script files go here)
::
::  The following variables found in setup () are
::  expected to be changed by the developer running
::  this process:
::
::  LIBRARY (The library to build for or {} for none)
::  PROJNAME (The name of your project)
::  STARTMSG (A message to echo at start of build)
::  ENDMSG (A message to echo at end of build)
::====================================================

@echo off
CALL :setup
CALL :openlink
CALL :link
CALL :closelink
CALL :compile
CALL :teardown
GOTO :eof

:setup
SET LIBRARY=jQuery
SET PROJNAME=ku4jQuery-kernel
SET STARTMSG=Building %PROJNAME%
SET ENDMSG=%PROJNAME% Complete :{)}

SET BIN=..\bin
SET SRC=..\src
SET COMPRESSOR=yuicompressor-2.4.6\build\yuicompressor-2.4.6.jar
SET LNKGFILE=%BIN%\%PROJNAME%-link.js
SET COMPFILE=%BIN%\%PROJNAME%-comp.js
SET JSFILE=%BIN%\%PROJNAME%-uncompressed.js
SET MINFILE=%BIN%\%PROJNAME%.js

@echo %STARTMSG%
GOTO :eof

:openlink
echo (function(l){ $=l;>> %LNKGFILE%
GOTO :eof

:link
@echo Linking
FOR /R %SRC% %%D IN (*.js) DO CALL :linkfile %%D
GOTO :eof

:closelink
echo })(%LIBRARY%);>> %LNKGFILE%
GOTO :eof

:linkfile
type %1 >> %LNKGFILE%
echo. >> %LNKGFILE%
GOTO :eof

:compile
@echo Compiling

echo.> %COMPFILE%
java -jar %COMPRESSOR% %LNKGFILE% -o %COMPFILE%

IF EXIST %MINFILE% del %MINFILE%
type %COMPFILE%>> %MINFILE%

IF EXIST %JSFILE% del %JSFILE%
type %LNKGFILE%>> %JSFILE%
GOTO :eof

:teardown
del %LNKGFILE%
del %COMPFILE%
@echo %ENDMSG%
GOTO :eof