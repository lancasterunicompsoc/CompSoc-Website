#!/bin/sh
# Currently next-auth is not working due to an issue with next-auth and nuxt-auth not interacting properly
# The current solution is to manually patch the package.json of next-auth
# https://github.com/sidebase/nuxt-auth/issues/518#issuecomment-1683642304

jq '.exports += {"./core":{"types":"./core/index.d.ts","default":"./core/index.js"}}' node_modules/next-auth/package.json > temp.json
mv temp.json node_modules/next-auth/package.json
