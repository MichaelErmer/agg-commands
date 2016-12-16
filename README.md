# AGG++ Commands

This module exports all the commands that AGG++ supports.

## Install

```shell
$ npm install agg-commands
```

## Usage

```javascript
var commands = require('agg-commands');
```

`.list` is an array contains all the lowercased commands:

```javascript
commands.list.forEach(function (command) {
  console.log(command);
});
```

`.exists()` is used to check if the command exists:

```javascript
commands.exists('get') // true
commands.exists('other-command') // false
```

`.hasFlag()` is used to check if the command has the flag:

```javascript
commands.hasFlag('get', 'readonly') // false
```

`.getKeyIndexes()` is used to get the indexes of keys in the command arguments:

```javascript
commands.getKeyIndexes('inc', ['key', 'value']) // [0]
commands.getKeyIndexes('get', ['key1']) // [0]
```

