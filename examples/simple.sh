#! /usr/bin/env bin

tsxPath="$(pwd)/node_modules/.bin/tsx"
mainFile="$(pwd)/src/index.ts"
configsFile="$(pwd)/examples/configs.json"

"$tsxPath" "$mainFile"
"$tsxPath" "$mainFile" -s "$configsFile" # add cronjob looping instruction
# "$tsxPath" "$mainFile" -l
# "$tsxPath" "$mainFile" -r

# "$tsxPath" "$mainFile" -V             # show version
# "$tsxPath" "$mainFile" -h             # show help
