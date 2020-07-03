###
 # @Author: your name
 # @Date: 2020-04-01 01:17:09
 # @LastEditTime: 2020-07-03 13:53:45
 # @LastEditors: luchun
 # @Description: In User Settings Edit
 # @FilePath: /stock/deploy.sh
 ###

#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
#git push -f git@github.com:jialuchun/jialuchun.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jialuchun/stock.git master:gh-pages

cd -
