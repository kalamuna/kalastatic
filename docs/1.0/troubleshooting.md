# Troubleshooting

Here are a few things you can do to troubleshoot Kalastatic.

## 1. Check Dependencies

Kalastatic requires [node](http://nodejs.org/) the version in the [README](https://github.com/kalamuna/kalastatic/blob/master/README.md)

    node --version
    npm --version

## 2. Clear caches and local changes

Sometimes older node modules and various local changes can cause issues. Clearing them may help:

    git reset --hard HEAD
    git clean -d -x -f
    rm -rf node_modules
    rm -rf ~/.npm
    npm install



## 3. Fool OS X to use build tools

If you are using the X-Code command-line tools on OS X (and not the full 6GB XCode)

``$ npm install``

may result in the following error:

````
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
````

you can either install XCode, or fool ``node-gyp`` into running with a symlink

``$ ln -s /usr/bin/true /usr/local/bin/xcodebuild``

then, delete node_modules and npm install again
