#!/bin/bash

VERSION=$1

# This is a general-purpose function to ask Yes/No questions in Bash, either
# with or without a default answer. It keeps repeating the question until it
# gets a valid answer.
# https://gist.github.com/davejamesmiller/1965569
ask() {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do

        # Ask the question (not using "read -p" as it uses stderr not stdout)
        echo -n "$1 [$prompt] "

        # Read the answer (use /dev/tty in case stdin is redirected from somewhere else)
        read reply </dev/tty

        # Default?
        if [ -z "$reply" ]; then
            reply=$default
        fi

        # Check if the reply is valid
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
        esac

    done
}

# make sure the release is being made from the master branch
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "master" ]]; then
  echo 'Not on master branch';
  exit 1;
fi

# make sure there aren't any uncommited changes
if ! git diff-index --quiet HEAD --; then
	echo 'Commit all changes before releas before making release'
	exit
fi

# make sure release number is valid
if ! [[ "$VERSION" =~ ^([0-9]\.[0-9]\.[0-9]) ]]; then
	echo "Release number must match a semver pattern similar to 1.0.0"
	exit
fi

# update package.json and package-lock.json
if ! npm version --git-tag-version=false $VERSION; then
	echo 'Version not updated'
	exit
fi

# build from source
if ! npm run build; then
	echo 'Build failed... cannot create release'
	exit
fi

# make sure tests pass
if ! npm test; then
	echo 'Tests failed... cannot create release'
	exit
fi

# make sure typescript test passes
if ! npm run test:types; then
	echo 'test:types failed'
	exit
fi

# prompt before finalizing
if ! ask "Version $VERSION is ready for release. Are you sure?"; then
	echo 'release aborted'
    exit
fi

git add .
git commit -a -m "v$VERSION Release"
git tag "v$VERSION"
git push origin "$BRANCH"
git push origin --tags
npm publish
echo "\033[32mv${VERSION} released\033[0;39m"
