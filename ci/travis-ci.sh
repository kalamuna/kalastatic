#!/bin/bash
  
##
# PROJECT SPECIFIC SETTINGS
##
KALA_REPO_URL="git@alltherepos.com:mysickrepo.git"
KALA_REPO_SLUG="kalamuna/sloth-nasty-6000"
KALA_REPO_BRANCH="master"

COMMAND=$1
EXIT_VALUE=0

##
# SCRIPT COMMANDS
##

# before-install
#
# Do some stuff before npm install
#
before-install() {
  echo
}

# before-script
#
# Install build dependencies
#
before-script() {
  npm install
}

# script
#
# Run the tests.
#
script() {
  npm test
}

# after-script
#
# Clean up after the tests.
#
after-script() {
  echo
}

# after-success
#
# Deploy
#
after-success() {
  if [ $TRAVIS_BRANCH == $KALA_REPO_BRANCH ] &&
    [ $TRAVIS_PULL_REQUEST == "false" ] &&
    [ $TRAVIS_REPO_SLUG == $KALA_REPO_SLUG ]; then
    # prepare the build for deployment
    # set up ssh keyz
    eval "$(ssh-agent)"
    ssh-add
    ssh-add -l
    # set up git user
    git config --global user.name "Kala C. Bot"
    git config --global user.email kalacommitbot@kalamuna.com

    # Clean and Build the site for production
    # before_deploy is not called for not Heroku.
    #npm run-script clean
    #npm run-script build-prod

    # clean to be sure
    rm -rf $TRAVIS_BUILD_DIR/deploy
    git clone $KALA_REPO_URL $TRAVIS_BUILD_DIR/deploy
    cd $TRAVIS_BUILD_DIR/deploy
    # move new code into repo and commit
    rsync -rt --exclude=.git --delete $TRAVIS_BUILD_DIR/build/ $TRAVIS_BUILD_DIR/deploy/
    git add --all
    git commit -m "KALABOT BUILDING COMMIT ${TRAVIS_COMMIT} FROM ${TRAVIS_REPO_SLUG}"
    # deploy it!
    git push origin $TRAVIS_BRANCH -f
    # clean up again
    rm -rf $TRAVIS_BUILD_DIR/deploy

    # mechanize our source merge commit
    #cd $TRAVIS_BUILD_DIR
    #git remote rm origin
    #git remote add origin git@github.com:kalamuna/kalamuna.com.git
    #git checkout $TRAVIS_BRANCH
    #git commit -m "KALABOT MERGING COMMIT ${TRAVIS_COMMIT} FROM ${TRAVIS_REPO_SLUG} [ci skip]" --amend --author="Kala C. Bot <kalacommitbot@kalamuna.com>" --no-verify
    #git push origin $TRAVIS_BRANCH -f
  fi
}

# before-deploy
#
# Before we run the deploy script, build for production.
#
before-deploy() {
  npm test
}

# after-deploy
#
# Clean up after the tests.
#
after-deploy() {
  echo
}

##
# UTILITY FUNCTIONS:
##

# Sets the exit level to error.
set_error() {
  EXIT_VALUE=1
}

# Runs a command and sets an error if it fails.
run_command() {
  set -xv
  if ! $@; then
    set_error
  fi
  set +xv
}

##
# SCRIPT MAIN:
##

# Capture all errors and set our overall exit value.
trap 'set_error' ERR

# We want to always start from the same directory:
cd $TRAVIS_BUILD_DIR

case $COMMAND in
  before-install)
  run_command before-install
  ;;

  before-script)
  run_command before-script
  ;;

  script)
  run_command script
  ;;

  after-script)
  run_command after-script
  ;;

  after-success)
  run_command after-success
  ;;

  before-deploy)
  run_command before-deploy
  ;;

  after-deploy)
  run_command after-deploy
  ;;
esac

exit $EXIT_VALUE
