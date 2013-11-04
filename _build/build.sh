#!/bin/sh
#===============kodmunki™ build process==============
# This build process is dependent upon yuicompressor
# and a specific directory structure:
#
# root
#   _build (This build script and the yuicompressor)
#   bin (The compiled scripts will appear here)
#   src (All script files go here)
#
# The following variables found in setup () are
# expected to be changed by the developer running
# this process:
#
# LIBRARY (The library to build for or {} for none)
# PROJNAME (The name of your project)
# STARTMSG (A message to echo at start of build)
# ENDMSG (A message to echo at end of build)
#====================================================

setup () {
    LIBRARY=jQuery
    PROJNAME="ku4jQuery-kernel"
    STARTMSG="Building $PROJNAME"
    ENDMSG="$PROJNAME Complete :{)}"

    BIN=../bin
    SRC=../src
    COMPRESSOR=yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar
    LNKGFILE=$BIN/${PROJNAME}-link.js
    COMPFILE=$BIN/${PROJNAME}-comp.js
    JSFILE=$BIN/${PROJNAME}-uncompressed.js
    MINFILE=$BIN/${PROJNAME}.js

    echo $STARTMSG
}

openlink () {
    touch $LNKGFILE
    echo "(function(l){ $=l;" >> $LNKGFILE
}

linkfiles () {
    SCRIPTS=`find $SRC -regex ".*\.js"`
    for f in $SCRIPTS
    do
    	cat $f >> $LNKGFILE
    	echo "\n" >> $LNKGFILE
    done
}

closelink () {
    echo "})($LIBRARY);" >> $LNKGFILE
}

compile () {
    echo Compiling
    
    touch $COMPFILE
    java -jar $COMPRESSOR $LNKGFILE -o $COMPFILE
    
    [ -f $MINFILE ] && rm $MINFILE
    touch $MINFILE
    cat $COMPFILE >> $MINFILE
    
    [ -f $JSFILE ] && rm $JSFILE
    touch $JSFILE
    cat $LNKGFILE >> $JSFILE
}

teardown () {
	rm $LNKGFILE
	rm $COMPFILE
	echo $ENDMSG
}

setup
openlink
linkfiles
closelink
compile
teardown
