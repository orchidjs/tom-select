/**
* Tom Select v1.5.0
* Licensed under the Apache License, Version 2.0 (the "License");
*/

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const KEY_A = 65;
const KEY_RETURN = 13;
const KEY_ESC = 27;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_TAB = 9;
const IS_MAC = typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
const KEY_SHORTCUT = IS_MAC ? 'metaKey' : 'ctrlKey'; // ctrl key or apple key for ma

exports.IS_MAC = IS_MAC;
exports.KEY_A = KEY_A;
exports.KEY_BACKSPACE = KEY_BACKSPACE;
exports.KEY_DELETE = KEY_DELETE;
exports.KEY_DOWN = KEY_DOWN;
exports.KEY_ESC = KEY_ESC;
exports.KEY_LEFT = KEY_LEFT;
exports.KEY_RETURN = KEY_RETURN;
exports.KEY_RIGHT = KEY_RIGHT;
exports.KEY_SHORTCUT = KEY_SHORTCUT;
exports.KEY_TAB = KEY_TAB;
exports.KEY_UP = KEY_UP;
//# sourceMappingURL=constants.js.map
