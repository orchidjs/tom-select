const IS_MAC			= /Mac/.test(navigator.userAgent);

const KEY_A				= 65;
const KEY_COMMA			= 188;
const KEY_RETURN		= 13;
const KEY_ESC			= 27;
const KEY_LEFT			= 37;
const KEY_UP			= 38;
const KEY_RIGHT			= 39;
const KEY_DOWN			= 40;
const KEY_BACKSPACE		= 8;
const KEY_DELETE		= 46;
const KEY_SHIFT			= 16;
const KEY_CTRL			= IS_MAC ? 18 : 17;
const KEY_TAB			= 9;

const KEY_CTRL_NAME		= IS_MAC ? 'metaKey' : 'ctrlKey';
