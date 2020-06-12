
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'mensa.yannickspoerl.de' > CNAME

git init
git add -A
git commit -m 'Commit'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:yannickspoerl/mensavue.git master:gh-pages

cd -
