#!/bin/bash

echo "Build script"

rm -rf build

cd ../frontend && npm install && npm run build && mv build ../backend/

cd ../backend && npm install

cd ../ && rm -rf frontend && rm -rf cypress