haxe doc.hxml
rm -r release
rm release.zip
mkdir release
cp -R src/* release
cp haxelib.xml release
cp haxedoc.xml release
cd release
zip -i ".*" -r ../release.zip .
cd ..
rm -r release
haxelib submit release.zip