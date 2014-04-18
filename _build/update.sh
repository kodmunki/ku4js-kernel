sh build.sh

echo "Copying resources to dependent projects/"
cp -f ../bin/ku4jQuery-kernel.js ../../ku4jQuery-data/tests/_dependencies/
cp -f ../bin/ku4jQuery-kernel.js ../../ku4jQuery-webApp/tests/_dependencies/
cp -f ../bin/ku4jQuery-kernel.js ../../ku4jQuery-webApp/example/scripts/example/lib/
cp -f ../bin/ku4jQuery-kernel.js ../../ku4jQuery-widget/tests/_dependencies/

echo "Update complete :{)}"