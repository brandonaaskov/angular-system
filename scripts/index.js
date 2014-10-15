angular.module('fs.system')
  .run(function ($window) {
    console.log('adsfsdfsadf')
    var parser = new UAParser()
    $window.parser = parser // todo remove;
  })
  .service('system', function () {
    var uaparser = new UAParser()

    var browser = uaparser.getBrowser()
    var device = uaparser.getDevice()
    var engine = uaparser.getEngine()
    var os = uaparser.getOS()
    var userAgentString = uaparser.getUA()

    //-------------------------------------------------------------------------------- checkers
    var isBrowser = function (name, version) {
      return _match(system.browser, name, version)
    }

    var isOS = function (name, version) {
      return _match(system.os, name, version)
    }

    var isEngine = function (name, version) {
      return _match(system.engine, name, version)
    }

    /**
     * Iterates over the provided list and when the value to match is loosely equal, we return true that we found
     * a match
     * @param list
     * @param valueToMatch
     * @returns {boolean}
     */
    var checkMatch = function (list, valueToMatch) {
      var matched = false

      _.find(list, function (itemValue) {
        if (_.isDefined(valueToMatch) && _.isDefined(itemValue) && _.isLooseEqual(valueToMatch, itemValue)) {
          matched = true
        }
      })

      return matched
    }

    var _match = function (list, name, version) {
      if (_.isUndefined(name)) {
        console.error("The name you provided to search through was undefined.")
        return false
      }

      var nameMatch = checkMatch(list, name)
      var versionMatch = checkMatch(list, version)

      //if name and version were passed in, we need to match on both to return true
      if (!_.isUndefined(version)) {
        if (nameMatch && versionMatch) {
          return true
        }
      }
      else if (nameMatch) {
        return true
      }

      return false
    }
    //-------------------------------------------------------------------------------- /checkers

    //no sense logging this stuff if the object is empty
    if (_.has(browser, 'name')) {
      console.log('(browser)', [browser.name, browser.version].join(' '))
    }

    if (_.has(device, 'name')) {
      console.log('(device)', [device.vendor, device.model, device.type].join(' '))
    }

    if (_.has(engine, 'name')) {
      console.log('(engine)', [engine.name, engine.version].join(' '))
    }

    if (_.has(os, 'name')) {
      console.log('(os)', [os.name, os.version].join(' '))
    }

    return system = {
      isBrowser: isBrowser,
      isOS: isOS,
      isEngine: isEngine,
      browser: {
        major: browser.major,
        name: browser.name,
        version: browser.version
      },
      device: {
        model: device.model,
        type: device.type,
        vendor: device.vendor
      },
      engine: {
        name: engine.name,
        version: engine.version
      },
      os: {
        name: os.name,
        version: os.version
      },
      ua: userAgentString
    }
  })
