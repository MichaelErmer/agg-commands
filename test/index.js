'use strict'

/* global describe, it */

var commands = require('..')
var expect = require('chai').expect

describe('agg-commands', function () {
  describe('.list', function () {
    it('should be an array', function () {
      expect(commands.list).to.be.instanceof(Array)
    })

    it('should ensure every command is uppercase', function () {
      commands.list.forEach(function (command) {
        expect(command.toUpperCase()).to.eql(command)
      })
    })

    it('should not contain multi-word commands', function () {
      commands.list.forEach(function (command) {
        expect(command.indexOf(' ')).to.eql(-1)
      })
    })
  })

  describe('.exists()', function () {
    it('should return true for existing commands', function () {
      expect(commands.exists('GET')).to.eql(true)
      expect(commands.exists('INC')).to.eql(true)
      expect(commands.exists('DEL')).to.eql(true)
    })

    it('should return false for non-existing commands', function () {
      expect(commands.exists('SET')).to.eql(false)
      expect(commands.exists('set get')).to.eql(false)
      expect(commands.exists('other-command')).to.eql(false)
    })
  })

  describe('.hasFlag()', function () {
    it('should return true if the command has the flag', function () {
      expect(commands.hasFlag('INC', 'write')).to.eql(true)
      expect(commands.hasFlag('RES', 'denyoom')).to.eql(true)
      expect(commands.hasFlag('GET', 'fast')).to.eql(true)
    })

    it('should return false otherwise', function () {
      expect(commands.hasFlag('SYN', 'fast')).to.eql(false)
      expect(commands.hasFlag('INC', 'readonly')).to.eql(false)
      expect(commands.hasFlag('INF', 'denyoom')).to.eql(false)
      expect(commands.hasFlag('GET', 'denyoom')).to.eql(false)
    })

    it('should throw on unknown commands', function () {
      expect(function () { commands.hasFlag('UNKNOWN') }).to.throw(Error)
    })
  })

  describe('.getKeyIndexes()', function () {
    var index = commands.getKeyIndexes

    it('should throw on unknown commands', function () {
      expect(function () { index('UNKNOWN') }).to.throw(Error)
    })

    it('should throw on faulty args', function () {
      expect(function () { index('GET', 'foo') }).to.throw(Error)
    })

    it('should return an empty array if no keys exist', function () {
      expect(index('INF', [])).to.eql([])
    })

    it('should return key indexes', function () {
      expect(index('INC', ['1,2,3,4,5,6,7,8', 3])).to.eql([0])
      expect(index('DEL', ['1,2,3,4,5,6,7,8'])).to.eql([0])
      expect(index('GET', ['1,2,3,4,5,6,7,8'])).to.eql([0])
    })
  })
})
