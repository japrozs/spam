#!/bin/bash

echo What should the version be ? 
read VERSION

cd ../nissan
echo "$ docker build -t japrozs/spam:$VERSION ."
docker build -t japrozs/spam:$VERSION .

echo "$ docker push japrozs/spam:$VERSION"
docker push japrozs/spam:$VERSION
cd ..
ssh -i root root@68.183.109.83 "docker pull japrozs/spam:$VERSION && docker tag japrozs/spam:$VERSION dokku/api:$VERSION && dokku tags:deploy api $VERSION"
