#!/bin/sh
setup () {
    KU4J=..
    LIBRARY=jQuery
    PROJNAME=ku4jQuery-kernel
    BIN=../bin
    LIB=../lib
    COMPRESSOR=yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar
    LNKGFILE=$BIN/${PROJNAME}-link.js
    COMPFILE=$BIN/${PROJNAME}-comp.js
    JSFILE=$BIN/${PROJNAME}-uncompressed.js
    MINFILE=$BIN/${PROJNAME}.js
}

alert () {
    echo Building $PROJNAME
}

openlink () {
    touch $LNKGFILE
    echo "(function($){" >> $LNKGFILE
}

linkfiles () {
    SCRIPTS=`find $LIB -regex ".*\.js"`
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
    echo //kodmunki utilities >> $MINFILE
    #cat license.txt >> $MINFILE
    cat $COMPFILE >> $MINFILE
    
    [ -f $JSFILE ] && rm $JSFILE
    touch $JSFILE
    cat $LNKGFILE >> $JSFILE
}

teardown () {
	rm $LNKGFILE
	rm $COMPFILE
	echo "DONE :{)}"
}

setup
alert
openlink
linkfiles
closelink
compile
teardown
