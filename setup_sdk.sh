#!/bin/bash

set -e
testDir="node-sdk-test"
GREEN="\033[0;32m"
NC="\033[0m"

if [ ! $PLIVO_API_PROD_HOST ] || [ ! $PLIVO_API_DEV_HOST ] || [ ! $PLIVO_AUTH_ID ] || [ ! $PLIVO_AUTH_TOKEN ]; then
    echo "Environment variables not properly set! Please refer to Local Development section in README!"
    exit 126
fi

cd /usr/src/app

echo "Setting plivo-api endpoint to dev..."
find /usr/src/app/lib/rest -type f -exec sed -i "s/$PLIVO_API_PROD_HOST/$PLIVO_API_DEV_HOST/g" {} \;

echo "Packaging SDK..."
echo "npm install" && npm install
echo "npm run prepublish" && npm run prepublish
echo "npm pack | tail -n 1" && package=$( npm pack | tail -n 1 )

if [ ! -d $testDir ]; then
    echo "Creating test dir..."
    mkdir -p $testDir
fi

if [ ! -f $testDir/test.js ]; then
    echo "Creating test file..."
    echo -e "let plivo = require('plivo')\n" > $testDir/test.js
    echo -e "\nlet client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);" >> $testDir/test.js
fi

echo "Installing dependencies for testing..."
mv $package $testDir 
cd $testDir 
rm -rf package*.json node_modules
npm init -y
npm install $package
rm $package

echo -e "\n\nSDK setup complete!"
echo "To test your changes:"
echo -e "\t1. Add your test code in <path_to_cloned_sdk>/$testDir/test.js on host (or /usr/src/app/$testDir/test.js in the container)"
echo -e "\t2. Run a terminal in the container using: $GREEN docker exec -it $HOSTNAME /bin/bash$NC"
echo -e "\t3. Navigate to the test directory: $GREEN cd /usr/src/app/$testDir$NC"
echo -e "\t4. Run your test file: $GREEN node test.js$NC"
echo -e "\t5. For running unit tests, run on host: $GREEN make test CONTAINER=$HOSTNAME$NC"

# To keep the container running post setup
/bin/bash