#!/bin/sh
LOCAL_HASH=`git rev-parse HEAD`
REMOTE_HASH=`git rev-parse origin/master`

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
  echo "Did you forget to push to origin/master?"
  exit 1
fi

export PATH="$(npm bin):$PATH"

VERSION=`auto version`

## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog

  ## Publish Package
  npm version $VERSION -m "Bump version to: %s [skip ci]"
  npm publish --access public

  ## Create GitHub Release
  git push --follow-tags --set-upstream origin $branch
  auto release
fi
