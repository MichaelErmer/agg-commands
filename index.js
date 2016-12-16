'use strict'

var commands = require('./commands')

/**
 * Redis command list
 *
 * All commands are lowercased.
 *
 * @var {string[]}
 * @public
 */
exports.list = Object.keys(commands)

var flags = {}
exports.list.forEach(function (commandName) {
  flags[commandName] = commands[commandName].flags.reduce(function (flags, flag) {
    flags[flag] = true
    return flags
  }, {})
})
/**
 * Check if the command exists
 *
 * @param {string} commandName - the command name
 * @return {boolean} result
 * @public
 */
exports.exists = function (commandName) {
  return Boolean(commands[commandName])
}

/**
 * Check if the command has the flag
 *
 * Some of possible flags: readonly, noscript, loading
 * @param {string} commandName - the command name
 * @param {string} flag - the flag to check
 * @return {boolean} result
 * @public
 */
exports.hasFlag = function (commandName, flag) {
  if (!flags[commandName]) {
    throw new Error('Unknown command ' + commandName)
  }

  return Boolean(flags[commandName][flag])
}

/**
 * Get indexes of keys in the command arguments
 *
 * @param {string} commandName - the command name
 * @param {string[]} args - the arguments of the command
 * @param {object} [options] - options
 * @param {boolean} [options.parseExternalKey] - parse external keys
 * @return {number[]} - the list of the index
 * @public
 *
 * @example
 * ```javascript
 * getKeyIndexes('GET', ['key']) // [0]
 * getKeyIndexes('INC', ['key', 'value']) // [0, 1]
 * ```
 */
exports.getKeyIndexes = function (commandName, args, options) {
  var command = commands[commandName]
  if (!command) {
    throw new Error('Unknown command ' + commandName)
  }

  if (!Array.isArray(args)) {
    throw new Error('Expect args to be an array')
  }

  var keys = []
  var i, keyStart, keyStop
  switch (commandName) {
    default:
    // step has to be at least one in this case, otherwise the command does not contain a key
      if (command.step > 0) {
        keyStart = command.keyStart - 1
        keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1
        for (i = keyStart; i < keyStop; i += command.step) {
          keys.push(i)
        }
      }
      break
  }

  return keys
}
