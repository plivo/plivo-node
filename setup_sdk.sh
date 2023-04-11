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

echo -e "\n\nSDK setup complete! You can test changes either on host or inside the docker container:"
echo -e "\ta. To test your changes ON HOST:"
echo -e "\t\t1. Add your test code in <path_to_cloned_sdk>/$testDir/test.js"
echo -e "\t\t2. Run your test file using: $GREEN make run CONTAINER=$HOSTNAME$NC"
echo -e "\t\t3. Run unit tests using: $GREEN make test CONTAINER=$HOSTNAME$NC"
echo
echo -e "\tb. To test your changes INSIDE CONTAINER:"
echo -e "\t\t1. Run a terminal in the container using: $GREEN docker exec -it $HOSTNAME /bin/bash$NC"
echo -e "\t\t2. Add your test code in /usr/src/app/$testDir/test.js"
echo -e "\t\t3. Run your test file using: $GREEN make run$NC"
echo -e "\t\t4. Run unit tests using: $GREEN make test$NC"

# To keep the container running post setup
/bin/bash