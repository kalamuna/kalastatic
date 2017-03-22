# Deployment

This article covers the steps in order to achieve deployment for your KalaStatic project.

## Manual Deployment

### Usage

To deploy the project to a configured upstream target, run:

`npm run deploy`

### Configuration

1. Open up your `package.json` file
1. Configure `config:deploy` in `package.json` to represent your deployment git repository. This could be your Pantheon git repository.
1. Configure `config:branch` to represent the default branch to deploy to. `master`, for example.
1. Open up `Gruntfile.js`, and configure the [`buildcontrol` task](https://github.com/robwierzbowski/grunt-build-control#buildcontrol-task) to suit your needs
1. Test locally by using `npm run deploy`
1. For [continuous deployment](https://en.wikipedia.org/wiki/Continuous_delivery), go through Travis set up below

#### deploying to github-pages
1. In `package.json`...
  1. Update the `config:repo` variable to be the GitHub repository
  1. Update the `config:branch` variable to be `gh-pages`
1. DOCUMENT BASEURL HERE
1. Run `npm run deploy`
1. Check `http://myorganization.github.io/myrepo` to see your site
#### troubleshooting
1. Ensure [`grunt-build-control`](https://github.com/robwierzbowski/grunt-build-control) is installed



## Automated Deployment

### Usage

### Configuration

1. Visit [Travis-CI.com](https://travis-ci.com/), or [Magnum Travis](https://magnum.travis-ci.com) for private repositories
1. Sign in with your GitHub account
1. Click the `+` sign to add a new repository
1. Sync the available repositories if needed
1. Ensure you're at the correct organization on the left
1. Enable the repository that you are looking to set up
1. In the source, ensure `.travis.yml` calls `npm run deploy` in `after_success`:
``` yaml
after_success:
# Automatically accept the host key authentication
- echo -e "Host *\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
# Set up git to know the user name
- git config --global user.name $GIT_NAME
- git config --global user.email $GIT_EMAIL
# Deploy if it's a Pull Request or a commit to master.
- if [[ $TRAVIS_PULL_REQUEST != 'false' || $TRAVIS_BRANCH == "master" ]] && [ $TRAVIS_REPO_SLUG == $GH_REPO ]; then npm run deploy; fi
```

Now any commit to master (including from outside services like Prose.io/Prismic) will trigger a build on Travis. Successful builds to MASTER will result in a commit by the [Kala Commit Bot](https://github.com/kalacommitbot) to the upstream hosting target. Proceed to key sharing.

#### Key Sharing

In order for Travis to deploy, it will have to have the correct keys. Key sharing will be rather different for public and private github repositories.

1. Follow instructions from Travis-CI on using the RSA key from the github user account:
  * http://docs.travis-ci.com/user/travis-pro
1. For private repositories:
  1. Head over to https://magnum.travis-ci.com
  1. Configure the repository
  1. Add the SSH key that you would like publishing the commits. For KalaCommitBot's SSH key, contact @RobLoach or @Pirog
  1. See Pantheon Hosting Connection below
1. For public repositories:
  1. Install the [Travis CLI](https://github.com/travis-ci/travis.rb#readme)
    ```
    gem install travis
    ```
  1. Retrieve the private SSH key to use for deployment to `deploy_key`. Get this from @RobLoach or @Pirog for kalacommitbot
  1. Run `travis encrypt-file deploy_key --add` to add the encrypted key settings to `.travis.yml`
  1. Delete `deploy_key` and make sure it does not get committed to the repository
  1. Read through `.travis.yml` and make sure it is now modified with the encrypted openssl command
  1. Modify the `-out` parameter to become `~/.ssh/id_rsa`
  1. Ensure `- chmod 600 ~/.ssh/id_rsa` is in `.travis.yml` so that it the correct permissions on Travis
  1. Now Travis should have the correct key to deploy. Test this by committing to the repository, and watching Travis logs.

#### Pantheon Hosting Connection

Travis/Pantheon integration requires an RSA key that at least has read access to your GitHub repo and write access to Pantheon's git repo. On the Pantheon side, you will need to add the kalacommitbot user to the team on the upstream target

![Pantheon team](https://www.evernote.com/shard/s195/sh/8e23fb60-093c-4b99-959f-1df7c4a9b497/2d1afd2e97f7f54a6cd9d50d1cc96da0/deep/0/Pantheon-Dashboard.png)
