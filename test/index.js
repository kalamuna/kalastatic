'use strict'

const execFile = require('child_process').execFile // eslint-disable-line prefer-destructuring
const exec = require('child_process').exec // eslint-disable-line prefer-destructuring
const path = require('path')
const assertDir = require('assert-dir-equal')
const KalaStatic = require('..')
const test = require('testit')
const nconf = require('nconf')
const extend = require('extend-shallow')
const rimraf = require('rimraf')

function setupTest(name, opts) {
  test(name, () => {
    return new Promise((resolve, reject) => {
      // Create the configuration for the test.
      const conf = new nconf.Provider()

      // Force the settings for the test.
      const testOpts = {
        base: path.join('test', 'fixtures', name)
      }
      extend(testOpts, opts)
      conf.overrides(testOpts)

      // Create the environment.
      const kalastatic = new KalaStatic(conf)
      kalastatic.build().then(() => {
        // Make sure the build passes.
        const base = kalastatic.nconf.get('base')
        const build = path.join(base, kalastatic.nconf.get('destination'))
        const expected = path.join(base, 'expected')
        assertDir(build, expected)

        // Continue the test suite.
        resolve()
      }, reject).catch(reject)
    })
  })
}

setupTest('basic')
setupTest('layouts')
setupTest('styles', {
  kss: false
})
setupTest('twig-filters', {
  pluginOpts: {
    'metalsmith-jstransformer': {
      engineLocals: {
        twig: {
          awesomeSauce: 'This Is The AwesomeSauce!'
        }
      }
    }
  }
})
setupTest('namespaces', {
  pluginOpts: {
    'metalsmith-jstransformer': {
      engineOptions: {
        twig: {
          namespaces: {
            custom: 'components/custom'
          }
        }
      }
    }
  },
  kss: {
    namespaces: {
      custom: 'components/custom'
    }
  }
})

test('cli', done => {
  const options = {
    cwd: 'test/fixtures/basic'
  }
  const binkstat = path.join(__dirname, '..', 'bin', 'kalastatic')
  execFile(binkstat, [], options, (err, stdout, stderr) => {
    if (err) {
      return done(err)
    }
    if (stderr) {
      return done(stderr.toString())
    }
    assertDir('test/fixtures/basic/build', 'test/fixtures/basic/expected')
    done()
  })
})

test('createcomponent', done => {
  const options = {
    cwd: '.'
  }
  rimraf.sync('test/fixtures/createcomponent/build/components')
  exec('bin/kalastatic cc --directory=test/fixtures/createcomponent/build/components atoms/links', options, (err, stdout, stderr) => {
    if (err) {
      return done(err)
    }
    if (stderr) {
      return done(stderr.toString())
    }
    assertDir('test/fixtures/createcomponent/build', 'test/fixtures/createcomponent/expected')
    done()
  })
})
