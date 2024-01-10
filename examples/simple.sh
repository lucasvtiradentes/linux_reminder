#! /usr/bin/env bin

csPath=./dist/index.js
filePath="$(pwd)/examples/configs.json"

# "$csPath"
"$csPath" -s "$filePath" # add cronjob looping instruction

# "$csPath" -V             # show version
# "$csPath" -h             # show help
